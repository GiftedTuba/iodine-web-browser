import { session, ipcMain } from 'electron';
import { ExtensibleSession } from 'electron-extensions/main';
import { getPath, makeId } from '~/utils';
import { promises, existsSync } from 'fs';
import { resolve, basename, parse, extname } from 'path';
import { WindowsManager } from './windows-manager';
import { registerProtocol } from './models/protocol';
import storage from './services/storage';
import * as url from 'url';
import { IDownloadItem } from '~/interfaces';
import { parseCrx } from '~/utils/crx';
import { pathExists } from '~/utils/files';
import { extractZip } from '~/utils/zip';

const extensibleSessionOptions = {
  backgroundPreloadPath: resolve(__dirname, 'extensions-background-preload.js'),
  contentPreloadPath: resolve(__dirname, 'extensions-content-preload.js'),
};

// TODO: move windows list to the corresponding sessions
export class SessionsManager {
  public view = session.fromPartition('persist:view');
  public viewIncognito = session.fromPartition('view_incognito');

  public extensions = new ExtensibleSession(
    this.view,
    extensibleSessionOptions,
  );
  public extensionsIncognito = new ExtensibleSession(
    this.viewIncognito,
    extensibleSessionOptions,
  );

  public incognitoExtensionsLoaded = false;

  private windowsManager: WindowsManager;

  public constructor(windowsManager: WindowsManager) {
    this.windowsManager = windowsManager;

    //this.loadExtensions('normal');

    registerProtocol(this.view);
    registerProtocol(this.viewIncognito);

    this.clearCache('incognito');

    this.view.webRequest.onBeforeRequest(
      { urls: ['<all_urls>'] },
      (details, callback) => {
        callback({ cancel: false });
      },
    );

    this.view.setPermissionRequestHandler(
      async (webContents, permission, callback, details) => {
        const window = windowsManager.findWindowByBrowserView(webContents.id);

        if (webContents.id !== window.viewManager.selectedId) return;

        if (permission === 'fullscreen') {
          callback(true);
        } else {
          try {
            const { hostname } = url.parse(details.requestingUrl);
            const perm: any = await storage.findOne({
              scope: 'permissions',
              query: {
                url: hostname,
                permission,
                mediaTypes: JSON.stringify(details.mediaTypes) || '',
              },
            });

            if (!perm) {
              const response = await window.permissionsDialog.requestPermission(
                permission,
                webContents.getURL(),
                details,
              );

              callback(response);

              await storage.insert({
                scope: 'permissions',
                item: {
                  url: hostname,
                  permission,
                  type: response ? 1 : 2,
                  mediaTypes: JSON.stringify(details.mediaTypes) || '',
                },
              });
            } else {
              callback(perm.type === 1);
            }
          } catch (e) {
            callback(false);
          }
        }
      },
    );

    this.view.on('will-download', (event, item, webContents) => {
      const fileName = item.getFilename();
      const id = makeId(32);
      const window = windowsManager.findWindowByBrowserView(webContents.id);

      if (!windowsManager.settings.object.downloadsDialog) {
        const downloadsPath = windowsManager.settings.object.downloadsPath;
        let i = 1;
        let savePath = resolve(downloadsPath, fileName);

        while (existsSync(savePath)) {
          const { name, ext } = parse(fileName);
          savePath = resolve(downloadsPath, `${name} (${i})${ext}`);
          i++;
        }

        item.savePath = savePath;
      }

      const downloadItem: IDownloadItem = {
        fileName: basename(item.savePath),
        receivedBytes: 0,
        totalBytes: item.getTotalBytes(),
        savePath: item.savePath,
        id,
      };

      window.downloadsDialog.webContents.send('download-started', downloadItem);
      window.webContents.send('download-started', downloadItem);

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed');
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused');
          } else {
            const data = {
              id,
              receivedBytes: item.getReceivedBytes(),
            };

            window.downloadsDialog.webContents.send('download-progress', data);
            window.webContents.send('download-progress', data);
          }
        }
      });
      item.once('done', async (event, state) => {
        if (state === 'completed') {
          window.downloadsDialog.webContents.send('download-completed', id);
          window.webContents.send(
            'download-completed',
            id,
            !window.downloadsDialog.visible,
          );

          if (extname(fileName) === '.crx') {
            const crxBuf = await promises.readFile(item.savePath);
            const crxInfo = parseCrx(crxBuf);

            if (!crxInfo.id) {
              crxInfo.id = makeId(32);
            }

            const extensionsPath = getPath('extensions');
            const path = resolve(extensionsPath, crxInfo.id);
            const manifestPath = resolve(path, 'manifest.json');

            if (await pathExists(path)) {
              console.log('Extension is already installed');
              return;
            }

            await extractZip(crxInfo.zip, path);

            const extension = {
              ...(await this.extensions.loadExtension(path)),
            };

            if (crxInfo.publicKey) {
              const manifest = JSON.parse(
                await promises.readFile(manifestPath, 'utf8'),
              );

              manifest.key = crxInfo.publicKey.toString('base64');

              await promises.writeFile(
                manifestPath,
                JSON.stringify(manifest, null, 2),
              );
            }

            delete extension.backgroundPage;

            window.webContents.send('load-browserAction', extension);
          }
        } else {
          console.log(`Download failed: ${state}`);
        }
      });
    });

    ipcMain.on('clear-browsing-data', () => {
      this.clearCache('normal');
      this.clearCache('incognito');
    });
  }

  public clearCache(session: 'normal' | 'incognito') {
    const ses = session === 'incognito' ? this.viewIncognito : this.view;

    ses.clearCache().catch(err => {
      console.error(err);
    });

    ses.clearStorageData({
      storages: [
        'appcache',
        'cookies',
        'filesystem',
        'indexdb',
        'localstorage',
        'shadercache',
        'websql',
        'serviceworkers',
        'cachestorage',
      ],
    });
  }

  public unloadIncognitoExtensions() {
    /*
    TODO(sentialx): unload incognito extensions
    this.incognitoExtensionsLoaded = false;
    */
  }

  public async loadExtensions(session: 'normal' | 'incognito') {
    const context =
      session === 'incognito' ? this.extensionsIncognito : this.extensions;

    const extensionsPath = getPath('extensions');
    const dirs = await promises.readdir(extensionsPath);

    for (const dir of dirs) {
      const extension = await context.loadExtension(
        resolve(extensionsPath, dir),
      );
      for (const windowWc of context.webContents) {
        windowWc.send('load-browserAction', extension);
      }
    }

    context.loadExtension(resolve(__dirname, 'extensions/midori-darkreader'));

    if (session === 'incognito') {
      this.incognitoExtensionsLoaded = true;
    }
  }
}

/* Copyright (c) 2021-2022 SnailDOS */

import { observable, action, makeObservable } from 'mobx';

import { ITabGroup } from '../models';
import { Store } from '.';
import {
  RED_500,
  CHERRY_500,
  ROSE_500,
  JAM_500,
  ORANGE_500,
  TANGERINE_500,
  MARIGOLD_500,
  CIDER_500,
  YELLOW_500,
  BEIGE_500,
  MACAROON_500,
  HAZEL_WOOD_500,
  GREEN_500,
  CHARTREUSE_500,
  JUNIPER_500,
  SAGE_500,
  BLUE_400,
  SLATE_500,
  SKY_500,
  NAVY_500,
  PURPLE_500,
  MAUVE_500,
  VIOLET_500,
  BOYSENBERRY_500,
} from '~/renderer/constants';
import { ipcRenderer } from 'electron';

export class TabGroupsStore {
  public list: ITabGroup[] = [];

  public palette: string[] = [
    RED_500,
    CHERRY_500,
    ROSE_500,
    JAM_500,
    ORANGE_500,
    TANGERINE_500,
    MARIGOLD_500,
    CIDER_500,
    YELLOW_500,
    BEIGE_500,
    MACAROON_500,
    HAZEL_WOOD_500,
    GREEN_500,
    CHARTREUSE_500,
    JUNIPER_500,
    SAGE_500,
    BLUE_400,
    SLATE_500,
    SKY_500,
    NAVY_500,
    PURPLE_500,
    MAUVE_500,
    VIOLET_500,
    BOYSENBERRY_500,
  ];

  private store: Store;

  public constructor(store: Store) {
    makeObservable(this, { list: observable, addGroup: action });

    this.store = store;

    ipcRenderer.on('edit-tabgroup', (e, t) => {
      if (t) {
        const group = this.getGroupById(t.id);
        if (t.name != null) group.name = t.name;
        if (t.color) group.color = t.color;
        store.tabs.updateTabsBounds(true);
      }
    });
  }

  public getGroupById(id: number) {
    return this.list.find((x) => x.id === id);
  }

  public addGroup() {
    const tabGroup = new ITabGroup(this.store, this);
    this.list.push(tabGroup);
    return tabGroup;
  }
}

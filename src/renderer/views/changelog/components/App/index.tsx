/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { EASING_FUNCTION, BLUE_500 } from '~/renderer/constants';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';
import { Button as ExtraStyledButton } from '~/renderer/components/Button';
import {
  StyledSection,
  Button,
  Title,
  Description,
  StyledLink,
  Favicon,
  Icon,
} from './style';
import { getWebUIURL } from '~/common/webui';
import { StyledButton } from '~/renderer/components/Button/styles';
import { ipcRenderer } from 'electron';

let page = 1

store.settings.theme = "wexond-dark";

const alreadyMaded = () => {
  store.settings.changelog = "10.0.2"
  ipcRenderer.invoke('permission-unlink');
  ipcRenderer.invoke('favicon-unlink');
  store.save()
  nextPage()
}


const nextPage = () => {
  const _page = JSON.stringify(page)
  document.getElementsByClassName("banner"+_page)[0].classList.remove("active")
  document.getElementsByClassName("banner"+_page)[0].classList.add("disabled")
 
  page += 1
  document.getElementsByClassName("banner"+JSON.stringify(page))[0].classList.add("active")
}

const commit = () => {
  window.location.replace(getWebUIURL('newtab'))
}

export default observer(() => {

  window.onload = function() {
    var oldver = store.settings.changelog;
    var newver = "0.1.1";
    if (newver >= oldver) {
      console.log("Update is required.")
      // Nothing yet since we dont need to upgrade anything
    } else {
      // Typically this means an update is not needed, but old versions will actually return "null" so we check for that.
      if (oldver == null) {
        alert("You are upgrading from Iodine 0.1.1")
      }
    }
    page = 1
    document.getElementsByClassName("banner1")[0].classList.add("active")
    // console.log(await defaultBrowser());

  }

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{position: 'relative'}}>
      <WebUIStyle />


      <StyledSection className="banner1">
        <Description>Iodine has been updated!</Description>
        <Title>Press Continue to see what's new!</Title>
        <Button theme={store.theme} onClick={nextPage}>Continue</Button>
      </StyledSection>

      <StyledSection className="banner2">
        <Favicon></Favicon>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>What has been changed?</Description>
        <Description>Introducing Iodine Bug Fix Update (v10.0.2)</Description>
        <Description>- Bug fixing the extension button.</Description>
        <Description>- Introducing our new permission system.</Description>
        <Description>- Minor Visual Changes</Description>
        <Description>- Rewriting Our Zoom System</Description>
        <Description>- Patching Tab Grouping and Bookmarks</Description>
        <Description>- Rewriting Our Download System</Description>
        <Description>- Options to clear certain Iodine databases</Description>
        <Description>And much, much more!</Description>
        <div style={{ width: '500px', display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
          <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          style={{ position: 'relative' }}
          onClick={nextPage}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Cool! <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

       <StyledSection className="banner3">
        <Favicon></Favicon>
        <Title>Iodine Setup</Title>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>For maximum privacy, set Iodine as your default browser! Press the Start button to start browsing!</Description>
        <div style={{ display: 'flex', width: "15%", justifyContent: "space-around" }}>
        </div>
          <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          onClick={alreadyMaded}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Start using Iodine!
            </div>
          </ExtraStyledButton>
      </StyledSection>
    </ThemeProvider>
  );
});

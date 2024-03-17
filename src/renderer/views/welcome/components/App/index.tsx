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
  Option,
  Icon,
} from './style';
import { getWebUIURL } from '~/common/webui';
import { StyledButton } from '~/renderer/components/Button/styles';

let page = 1
let theme = "Light"


const alreadyMaded = () => {
  nextPage()
}

const nextPage = () => {
  const _page = JSON.stringify(page)
  document.getElementsByClassName("banner"+_page)[0].classList.remove("active")
  document.getElementsByClassName("banner"+_page)[0].classList.add("disabled")
 
  page += 1
  document.getElementsByClassName("banner"+JSON.stringify(page))[0].classList.add("active")
}

const themeset = (mode: string) => {
  theme = mode

  if (theme == "Light") {
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("purple_and_yellow")[0].classList.remove("active")
    document.getElementsByClassName("red_and_green")[0].classList.remove("active")
    document.getElementsByClassName("Light")[0].classList.add("active")
    store.settings.theme = "wexond-light";
    store.settings.themeAuto = false;
    store.save();
  } if (theme =="Dark") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("purple_and_yellow")[0].classList.remove("active")
    document.getElementsByClassName("red_and_green")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.add("active")
    store.settings.theme = "wexond-dark";
    store.settings.themeAuto = false;
    store.save();
  } if (theme =="Blue") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("purple_and_yellow")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("red_and_green")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.add("active")
    store.settings.theme = "Iodine-blue";
    store.settings.themeAuto = false;
    store.save();
  } if (theme =="purple_and_yellow") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("red_and_green")[0].classList.remove("active")
    document.getElementsByClassName("purple_and_yellow")[0].classList.add("active")
    store.settings.theme = "Iodine-purple_and_yellow";
    store.settings.themeAuto = false;
    store.save();
  } if (theme =="red_and_green") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("purple_and_yellow")[0].classList.remove("active")
    document.getElementsByClassName("red_and_green")[0].classList.add("active")
    store.settings.theme = "Iodine-red_and_green";
    store.settings.themeAuto = false;
    store.save();
  }
}

const commit = () => {
  store.settings.notnew = "false"
  store.settings.changelog = "10.0.2"
  store.save()
  window.location.replace(getWebUIURL('newtab'))
}

const headtosettings = () => {
  window.location.replace(getWebUIURL('settings'))
}

const addDefault = () => {
  window.location.href = "ms-settings:defaultapps"
  nextPage()
}

/* Basically what this does is it adds the pages, along with everything inside them, on the iodine welcome page, that can be triggered
when opening iodine for the first time (When there's no user data logged) or by entering iodine://welcome in the url bar. To add a new
page, make sure that you have the banner set number, for example <StyledSection className="banner()"> should have a unique number, but
in between other numbers, numerically. So if I wanted my page to be second, it would be banner2, I just have to make sure that nobody
else is using banner2, and that the pages are all in order of banner numbers. */

/* Note: To fix bug with theme selection in welcome page, maybe remove store.settings.theme = "wexond-dark"; */

/* To-do: Add Function that defines language variable */

export default observer(() => {

  window.onload = function() {
    page = 1
    document.getElementsByClassName("Dark")[0].classList.add("active")
    store.settings.theme = "wexond-dark";
    document.getElementsByClassName("banner1")[0].classList.add("active")
    // console.log(await defaultBrowser());

  }

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{position: 'relative'}}>
      <WebUIStyle />


      <StyledSection className="banner1">
        <Description>Welcome to Iodine</Description>
        <Title>Start!</Title>
        <Button theme={store.theme} onClick={nextPage}>Start!</Button>
      </StyledSection>

      <StyledSection className="banner2">
        <Favicon></Favicon>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>Pick a theme!</Description>
        <div style={{ display: 'flex', width: "550px", justifyContent: "space-around" }}>
          <Option onClick={() => themeset("lightTheme")} className="Light">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#fff", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Light
            </div>
          </Option>
          <Option onClick={() => themeset("darkTheme")} className="Dark">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#5f6368", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Dark
            </div>
          </Option>
          <Option onClick={() => themeset("Pink_theme")} className="Blue">
            <div style={{ border: "1px solid #0000FF", backgroundColor: "#0026ff", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Blue/Orange
            </div>
          </Option>
          <Option onClick={() => themeset("purple_and_yellow_theme")} className="purple_and_yellow">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#b500fc", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Purple/Yellow
            </div>
          </Option>
          <Option onClick={() => themeset("red_and_green_theme")} className="Green_and_Yellow">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#b500fc", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Green/Red
            </div>
          </Option>
        </div>
        <div style={{ width: '500px', display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <ExtraStyledButton
          background="transparent"
          foreground="rgb(138, 180, 248)"
          style={{ marginLeft: 8 }}
          onClick={nextPage}
          >
            Skip
          </ExtraStyledButton>
          <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          style={{ marginLeft: 8, position: 'relative' }}
          onClick={nextPage}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Next <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

       <StyledSection className="banner3">
        <Favicon></Favicon>
        <Title>Iodine Setup</Title>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>For maximum privacy, set Iodine as your default browser!</Description>
        <div style={{ display: 'flex', width: "15%", justifyContent: "space-around" }}>
        </div>
        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <ExtraStyledButton
          background="transparent"
          foreground="rgb(138, 180, 248)"
          style={{ marginLeft: 8 }}
          onClick={alreadyMaded}
          >
            Skip!
          </ExtraStyledButton>
          <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          style={{ marginLeft: 8, position: 'relative' }}
          onClick={addDefault}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Add default browser
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner4">
        <Description>Iodine is an incredible browser!</Description>
        <Title>Built-in adblocker and more.</Title>
        <Button theme={store.theme} onClick={commit}>Lets get started!</Button>
        <Button theme={store.theme} onClick={headtosettings}>
          <div style={{ marginTop: ".50rem" }}>
            Or keep modifying settings!
          </div>
        </Button>
      </StyledSection>
    </ThemeProvider>
  );
});

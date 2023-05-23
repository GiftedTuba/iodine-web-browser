/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Colors, Color } from './style';
import store from '../../store';
import { Textfield } from '~/renderer/components/Textfield';
import { ipcRenderer } from 'electron';
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
import { UIStyle } from '~/renderer/mixins/default-styles';

const onChange = (e: any) => {
  ipcRenderer.send(`edit-tabgroup-${store.windowId}`, {
    name: store.inputRef.current.value,
    id: store.tabGroupId,
  });
};

const onColorClick = (color: string) => () => {
  ipcRenderer.send(`edit-tabgroup-${store.windowId}`, {
    color,
    id: store.tabGroupId,
  });
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp>
        <UIStyle />
        <Textfield
          dark={store.theme['dialog.lightForeground']}
          placeholder="Name"
          style={{ width: '100%' }}
          onChange={onChange}
          ref={store.inputRef}
        />

        <Colors>
          {[
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
          ].map((color, key) => (
            <Color
              color={color}
              onClick={onColorClick(color)}
              key={key}
            ></Color>
          ))}
        </Colors>
      </StyledApp>
    </ThemeProvider>
  );
});

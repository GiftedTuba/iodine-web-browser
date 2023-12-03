/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';
import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import { TopBarVariant } from '~/interfaces';

const onLanguageChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const LanguageVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <Row>
      <Title>Language</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'english' : defaultValue}
          onChange={onLanguageChange}
        >
          <Dropdown.Item value="english">English</Dropdown.Item>
          <Dropdown.Item value="espanol">Espanol</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

export const Language = () => {
  return (
    <>
      <Header>Language</Header>
      <LanguageVariant />
    </>
  );
};
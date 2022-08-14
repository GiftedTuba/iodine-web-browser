/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';


const Location = observer(() => {
  return (
    <Row>
      <Title>
        Midori is a privacy orientated browser with tons of features such as a
        built in Ad Blocker. Midori is made with love by the Astian, Inc. Big
        thanks to all our contributers...
        <p></p>
        <Title>Astian, Inc - Development and Code</Title>
        <p></p>
        <Title>Wexond - Original Fork</Title>
        <p></p>
        <Title>Preknowledge - Contributer</Title>
        <p></p>
        <Title>JOshua - Graphic Designer</Title>
        <p></p>
        <Title> Mauro - Contributer</Title>
        <p></p>
        <Title>HzzaAwesome - Graphic Designer</Title>
        </Title>
    </Row>
  );
});

export const About = () => {
  return (
    <>
      <Header>About Midori</Header>
      <Title>Your version of Midori is v10.0.2</Title>
      <Location />
    </>
  );
};

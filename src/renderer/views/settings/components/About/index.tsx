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

        Iodine is an epic, privacy orientated browser with tons of features such as a
        built in Ad Blocker. Iodine is happily made by Matthew Woodard, and special thanks to Astian Inc. For contributing to code to the base of Iodine. Of course, we also
        thanks to all our other contributers...
        <p></p>
        <Title>Midori - Original Fork</Title>
        <p></p>
        <Title>Wexond - Original, Original Fork</Title>
        <p></p>
        <Title>Preknowledge - Contributer</Title>
        <p></p>
        <Title>JOshua - Graphic Designer</Title>
        <p></p>
        <Title> Mauro - Contributer</Title>
        <p></p>
        <Title>HzzaAwesome - Graphic Designer</Title>
        <p></p>
        <p></p>
      </Title>
      <Title>Did you know that Iodine is open source? Find it here at https://github.com/matthewmyles/iodine-web-browser</Title>
    </Row>
  );
});

export const About = () => {
  return (
    <>
      <Header>About Iodine</Header>
      <Title>Your version of Iodine is 0.1.1
      </Title>
      <Location />
    </>
  );
};

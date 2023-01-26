/* Copyright (c) 2021-2022 SnailDOS */

import { lightTheme, darkTheme, blue_and_orange_theme, purple_and_yellow_theme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'midori-blue') return blue_and_orange_theme;
  else if (name === 'midori-lavender') return purple_and_yellow_theme;
  return lightTheme;
};

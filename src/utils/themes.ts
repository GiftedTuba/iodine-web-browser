/* Copyright (c) 2021-2022 SnailDOS */

import { lightTheme, darkTheme, blue_and_orange_theme, purple_and_yellow_theme, red_and_green_theme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'Iodine-blue') return blue_and_orange_theme;
  else if (name === 'Iodine-purple_and_yellow') return purple_and_yellow_theme;
  else if (name === 'Iodine-red_and_green') return red_and_green_theme;
  return lightTheme;
};

/* Copyright (c) 2021-2022 SnailDOS */

import { ITheme } from '~/interfaces';
import { BLUE_500 } from './colors';

/* Basically, this file defines all the themes, storing their values into variables, usually named by the color of their theme.
You can add whatever number of themes you want, just follow the structure of all the other themes. This theme will then be included in several other files. */

export const lightTheme: ITheme = {
  'titlebar.backgroundColor': '#d4d4d4',
  'addressbar.backgroundColor': '#fff',
  'addressbar.textColor': '#000',
  'toolbar.backgroundColor': '#f8f8f8',
  'toolbar.bottomLine.backgroundColor': 'rgba(0, 0, 0, 0.12)',
  'toolbar.lightForeground': false,
  'toolbar.separator.color': 'rgba(0, 0, 0, 0.12)',
  'tab.selected.textColor': '#000',
  'tab.textColor': `rgba(0, 0, 0, 0.7)`,
  'control.backgroundColor': 'rgba(0, 0, 0, 0.08)',
  'control.hover.backgroundColor': 'rgba(0, 0, 0, 0.1)',
  'control.valueColor': '#000',
  'control.lightIcon': false,
  'switch.backgroundColor': 'rgba(0, 0, 0, 0.16)',
  'dialog.backgroundColor': '#fff',
  'dialog.separator.color': 'rgba(0, 0, 0, 0.12)',
  'dialog.textColor': '#000',
  'dialog.lightForeground': false,
  'searchBox.backgroundColor': '#fff',
  'searchBox.lightForeground': false,
  'pages.backgroundColor': '#fff',
  'pages.lightForeground': false,
  'pages.textColor': '#000',
  'dropdown.backgroundColor': '#fff',
  'dropdown.backgroundColor.translucent': 'rgba(255, 255, 255, 0.7)',
  'dropdown.separator.color': 'rgba(0, 0, 0, 0.12)',
  'pages.navigationDrawer1.backgroundColor': '#f5f5f5',
  'pages.navigationDrawer2.backgroundColor': '#fafafa',

  accentColor: BLUE_500,
  backgroundColor: '#fff',
};

export const darkTheme: ITheme = {
  'titlebar.backgroundColor': '#1c1c1c',
  'addressbar.backgroundColor': '#262626',
  'addressbar.textColor': '#fff',
  'toolbar.backgroundColor': '#333333',
  'toolbar.bottomLine.backgroundColor': 'rgba(255, 255, 255, 0.08)',
  'toolbar.lightForeground': true,
  'toolbar.separator.color': 'rgba(255, 255, 255, 0.12)',
  'tab.selected.textColor': '#fff',
  'tab.textColor': 'rgba(255, 255, 255, 0.54)',
  'control.backgroundColor': 'rgba(255, 255, 255, 0.1)',
  'control.hover.backgroundColor': 'rgba(255, 255, 255, 0.12)',
  'control.valueColor': '#fff',
  'control.lightIcon': true,
  'switch.backgroundColor': 'rgba(255, 255, 255, 0.24)',
  'dialog.backgroundColor': '#383838',
  'dialog.separator.color': 'rgba(255, 255, 255, 0.12)',
  'dialog.textColor': '#fff',
  'dialog.lightForeground': true,
  'searchBox.backgroundColor': '#262626',
  'searchBox.lightForeground': true,
  'pages.backgroundColor': '#212121',
  'pages.lightForeground': true,
  'pages.textColor': '#fff',
  'dropdown.backgroundColor': 'rgb(66, 66, 66)',
  'dropdown.backgroundColor.translucent': 'rgb(60, 60, 60, 0.6)',
  'dropdown.separator.color': 'rgba(255, 255, 255, 0.12)',
  'pages.navigationDrawer1.backgroundColor': 'rgba(255, 255, 255, 0.1)',
  'pages.navigationDrawer2.backgroundColor': 'rgba(255, 255, 255, 0.05)',

  backgroundColor: '#1c1c1c',
  accentColor: BLUE_500,
};

export const Pink_theme: ITheme = {
  'titlebar.backgroundColor': '#fcb5b9', /* Light Pink */
  'addressbar.backgroundColor': '#fcb5b9', /* Light Pink */
  'addressbar.textColor': '#d86a6f', /* Pink */
  'toolbar.backgroundColor': '#d86a6f', /* Pink */
  'toolbar.bottomLine.backgroundColor': '#d86a6f', /* Pink */
  'toolbar.lightForeground': true,
  'toolbar.separator.color': '#d86a6f', /* Pink */
  'tab.selected.textColor': '#fcb5b9', /* Light Pink */
  'tab.textColor': '#d86a6f', /* Pink */
  'control.backgroundColor': '#fcb5b9', /* Light Pink */
  'control.hover.backgroundColor': '#fcb5b9', /* Light Pink */
  'control.valueColor': '#d86a6f', /* Pink */
  'control.lightIcon': true,
  'switch.backgroundColor': '#fcb5b9', /* Light Pink */
  'dialog.backgroundColor': '#d86a6f', /* Pink */
  'dialog.separator.color': '#d86a6f', /* Pink */
  'dialog.textColor': '#fcb5b9', /* Light Pink */
  'dialog.lightForeground': true,
  'searchBox.backgroundColor': '#d86a6f', /* Pink */
  'searchBox.lightForeground': true,
  'pages.backgroundColor': '#d86a6f', /* Pink */
  'pages.lightForeground': true,
  'pages.textColor': 'FFAC00', /* Light Pink */
  'dropdown.backgroundColor': '#d86a6f', /* Pink */
  'dropdown.backgroundColor.translucent': '#d86a6f', /* Pink */
  'dropdown.separator.color': '#d86a6f', /* Pink */
  'pages.navigationDrawer1.backgroundColor': '#d86a6f', /* Pink */
  'pages.navigationDrawer2.backgroundColor': '#d86a6f', /* Pink */

  backgroundColor: '#fcb5b9', /* Light Pink */
  accentColor: BLUE_500,
};

export const purple_and_yellow_theme: ITheme = {
  'titlebar.backgroundColor': '#faff00', /* Yellow */
  'addressbar.backgroundColor': '#faff00', /* Yellow */
  'addressbar.textColor': '#7800ff', /* Purple */
  'toolbar.backgroundColor': '#7800ff', /* Purple */
  'toolbar.bottomLine.backgroundColor': '#7800ff', /* Purple */
  'toolbar.lightForeground': false,
  'toolbar.separator.color': '#7800ff', /* Purple */
  'tab.selected.textColor': '#faff00', /* Yellow */
  'tab.textColor': '#7800ff', /* Purple */
  'control.backgroundColor': '#faff00', /* Yellow */
  'control.hover.backgroundColor': '#faff00', /* Yellow */
  'control.valueColor': '#7800ff', /* Purple */
  'control.lightIcon': true,
  'switch.backgroundColor': '#7800ff', /* Purple */
  'dialog.backgroundColor': '#7800ff', /* Purple */
  'dialog.separator.color': '#7800ff', /* Purple */
  'dialog.textColor': '#faff00', /* Yellow */
  'dialog.lightForeground': true,
  'searchBox.backgroundColor': '#7800ff', /* Purple */
  'searchBox.lightForeground': false,
  'pages.backgroundColor': '#7800ff', /* Purple */
  'pages.lightForeground': false,
  'pages.textColor': '#faff00', /* Yellow */
  'dropdown.backgroundColor': '#7800ff', /* Purple */
  'dropdown.backgroundColor.translucent': '#7800ff', /* Purple */
  'dropdown.separator.color': '#7800ff', /* Purple */
  'pages.navigationDrawer1.backgroundColor': '#7800ff', /* Purple */
  'pages.navigationDrawer2.backgroundColor': '#7800ff', /* Purple */

  backgroundColor: '#faff00', /* Yellow */
  accentColor: BLUE_500,
};

export const red_and_green_theme: ITheme = {
  'titlebar.backgroundColor': '#ff0000', /* Red */
  'addressbar.backgroundColor': '#ff0000', /* Red*/
  'addressbar.textColor': '#008000', /* Green */
  'toolbar.backgroundColor': '#008000', /* Green */
  'toolbar.bottomLine.backgroundColor': '#008000', /* Green */
  'toolbar.lightForeground': false,
  'toolbar.separator.color': '#008000', /* Green */
  'tab.selected.textColor': '#ff0000', /* Red */
  'tab.textColor': '#008000', /* Green */
  'control.backgroundColor': '#ff0000', /* Red */
  'control.hover.backgroundColor': '#ff0000', /* Red */
  'control.valueColor': '#008000', /* Green */
  'control.lightIcon': true,
  'switch.backgroundColor': '#008000', /* Green */
  'dialog.backgroundColor': '#008000', /* Green */
  'dialog.separator.color': '#008000', /* Green */
  'dialog.textColor': '#ff0000', /* Red */
  'dialog.lightForeground': true,
  'searchBox.backgroundColor': '#008000', /* Green */
  'searchBox.lightForeground': false,
  'pages.backgroundColor': '#008000', /* Green */
  'pages.lightForeground': false,
  'pages.textColor': '#ff0000', /* Red */
  'dropdown.backgroundColor': '#008000', /* Green */
  'dropdown.backgroundColor.translucent': '#008000', /* Green */
  'dropdown.separator.color': '#008000', /* Green */
  'pages.navigationDrawer1.backgroundColor': '#008000', /* Green */
  'pages.navigationDrawer2.backgroundColor': '#008000', /* Green */

  backgroundColor: '#ff0000', /* Red */
  accentColor: BLUE_500,
};

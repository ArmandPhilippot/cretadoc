import type { Theme, ThemeAuthor, ThemeTokens } from '../../types';
import { animation } from './animation';
import { border } from './border';
import { darkColor, lightColor } from './color';
import { font } from './font';
import { shadow } from './shadow';
import { spacing } from './spacing';

const cretadocAuthor: ThemeAuthor = {
  name: 'Cretadoc',
  website: 'https://github.com/ArmandPhilippot/cretadoc',
};

const cretadocLightTokens: ThemeTokens = {
  animation,
  border,
  color: lightColor,
  font,
  shadow,
  spacing,
};

export const cretadocLight: Theme = {
  author: cretadocAuthor,
  id: 'cretadoc-light',
  name: 'Cretadoc Light',
  scheme: 'light',
  tokens: cretadocLightTokens,
};

const cretadocDarkTokens: ThemeTokens = {
  animation,
  border,
  color: darkColor,
  font,
  shadow,
  spacing,
};

export const cretadocDark: Theme = {
  author: cretadocAuthor,
  id: 'cretadoc-dark',
  name: 'Cretadoc Dark',
  scheme: 'dark',
  tokens: cretadocDarkTokens,
};

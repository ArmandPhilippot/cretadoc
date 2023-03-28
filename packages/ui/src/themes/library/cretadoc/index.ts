import type { Theme, ThemeTokens } from '../../types';
import { animation } from './animation';
import { border } from './border';
import { darkColor, lightColor } from './color';
import { font } from './font';
import { spacing } from './spacing';

const cretadocLightTokens: ThemeTokens = {
  animation,
  border,
  color: lightColor,
  font,
  spacing,
};

export const cretadocLight: Theme = {
  author: {
    name: 'Cretadoc',
    website: 'https://github.com/ArmandPhilippot/cretadoc',
  },
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
  spacing,
};

export const cretadocDark: Theme = {
  author: {
    name: 'Cretadoc',
    website: 'https://github.com/ArmandPhilippot/cretadoc',
  },
  id: 'cretadoc-dark',
  name: 'Cretadoc Dark',
  scheme: 'dark',
  tokens: cretadocDarkTokens,
};

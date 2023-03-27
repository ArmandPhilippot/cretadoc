import type { Theme, ThemeTokens } from '../../types';
import { border } from './border';
import { darkColor, lightColor } from './color';
import { font } from './font';

const cretadocLightTokens: ThemeTokens = {
  border,
  color: lightColor,
  font,
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
  border,
  color: darkColor,
  font,
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

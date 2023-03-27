import type { Theme, ThemeTokens } from '../../types';
import { border } from './border';
import { darkColor, lightColor } from './color';

const cretadocLightTokens: ThemeTokens = {
  border,
  color: lightColor,
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

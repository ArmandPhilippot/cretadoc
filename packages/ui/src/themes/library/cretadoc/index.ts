import type { Theme, ThemeAuthor, ThemeTokens } from '../../../types';
import { animation } from './animation';
import { border } from './border';
import { darkColor, lightColor } from './color';
import { font } from './font';
import { icon } from './icon';
import { darkShadow, lightShadow } from './shadow';
import { size } from './size';
import { spacing } from './spacing';

const cretadocAuthor = {
  name: 'Cretadoc',
  website: 'https://github.com/ArmandPhilippot/cretadoc',
} satisfies ThemeAuthor;

const cretadocLightTokens = {
  animation,
  border,
  color: lightColor,
  font,
  icon,
  shadow: lightShadow,
  size,
  spacing,
} satisfies ThemeTokens;

export const cretadocLight = {
  author: cretadocAuthor,
  id: 'cretadoc-light',
  name: 'Cretadoc Light',
  scheme: 'light',
  tokens: cretadocLightTokens,
} as const satisfies Theme;

const cretadocDarkTokens = {
  animation,
  border,
  color: darkColor,
  font,
  icon,
  shadow: darkShadow,
  size,
  spacing,
} satisfies ThemeTokens;

export const cretadocDark = {
  author: cretadocAuthor,
  id: 'cretadoc-dark',
  name: 'Cretadoc Dark',
  scheme: 'dark',
  tokens: cretadocDarkTokens,
} as const satisfies Theme;

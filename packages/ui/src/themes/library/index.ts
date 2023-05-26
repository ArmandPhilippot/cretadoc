import type { ReadonlyDeep } from '@cretadoc/utils';
import type { Themes } from '../types';
import { cretadocDark, cretadocLight } from './cretadoc';

export const themes = {
  cretadocDark,
  cretadocLight,
} satisfies ReadonlyDeep<Themes>;

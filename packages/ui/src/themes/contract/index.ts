import type { Nullable, ReplaceTypesIn } from '@cretadoc/utils';
import { createGlobalThemeContract } from '@vanilla-extract/css';
import type { ThemeTokens } from '../types';
import { THEME_VARS_PREFIX } from '../utils/constants';
import { animation, border, color, font, shadow, spacing } from './tokens';

const themeContract: ReplaceTypesIn<ThemeTokens, string> = {
  animation,
  border,
  color,
  font,
  shadow,
  spacing,
};

/**
 * Add a prefix to the given value.
 *
 * @param {Nullable<string>} value - The value to prefix.
 * @returns {string} The prefixed value.
 */
const setPrefix = (value: Nullable<string>): string => {
  if (value) return `${THEME_VARS_PREFIX}-${value}`;
  return '';
};

/**
 * The theme contract.
 *
 * It defines all the tokens needed to create a new theme.
 */
export const contract = createGlobalThemeContract(themeContract, setPrefix);

import { getValueByKeyPath, isString, type KeyPathIn } from '@cretadoc/utils';
import { createGlobalTheme } from '@vanilla-extract/css';
import { contract } from '../contract';
import {
  type CretadocTheme,
  themesIds,
  type CretadocDarkTheme,
  darkThemesIds,
  type CretadocLightTheme,
  lightThemesIds,
} from '../library';
import type { Theme } from '../types';

/**
 * Build all themes as global themes.
 *
 * @param {Theme[]} themes - An array of themes.
 * @returns {void}
 */
export const buildThemes = (themes: Theme[]): void => {
  for (const theme of themes)
    createGlobalTheme(`[data-theme='${theme.id}']`, contract, theme.tokens);
};

/**
 * Check if a given id match an existing theme id.
 *
 * @param {string} theme - Maybe a theme id.
 * @returns {boolean} True if the given theme matches a theme id.
 */
export const isValidThemeId = (theme: string): theme is CretadocTheme =>
  (themesIds as string[]).includes(theme);

/**
 * Check if a given id match an existing dark theme id.
 *
 * @param {string} theme - Maybe a theme id.
 * @returns {boolean} True if the given theme matches a dark theme id.
 */
export const isValidDarkThemeId = (theme: string): theme is CretadocDarkTheme =>
  (darkThemesIds as string[]).includes(theme);

/**
 * Check if a given id match an existing light theme id.
 *
 * @param {string} theme - Maybe a theme id.
 * @returns {boolean} True if the given theme matches a light theme id.
 */
export const isValidLightThemeId = (
  theme: string
): theme is CretadocLightTheme => (lightThemesIds as string[]).includes(theme);

/**
 * Retrieve the contract value from a design token.
 *
 * @param {KeyPathIn<typeof contract, 'color'>} token - A design token.
 * @returns {string} The contract value.
 */
export const getContractValueFrom = (
  token: KeyPathIn<typeof contract>
): string => {
  const value = getValueByKeyPath(contract, token);

  return isString(value) ? value : '';
};

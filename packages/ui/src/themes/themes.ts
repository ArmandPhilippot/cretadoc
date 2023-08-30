import { createGlobalTheme } from '@vanilla-extract/css';
import type { Theme } from '../types';
import { contract } from './contract';
import {
  type CretadocDarkTheme,
  type CretadocLightTheme,
  type CretadocTheme,
  darkThemesIds,
  lightThemesIds,
  themesIds,
} from './library';

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

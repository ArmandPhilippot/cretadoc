import { createGlobalTheme } from '@vanilla-extract/css';
import { contract } from '../contract';
import type { Themes } from '../types';

/**
 * Build all themes as global themes.
 *
 * @param {Themes} themesList - An object containing the themes list.
 * @returns {void}
 */
export const buildThemes = (themesList: Themes): void => {
  for (const theme of Object.values(themesList))
    createGlobalTheme(`[data-theme='${theme.id}'] *`, contract, theme.tokens);
};

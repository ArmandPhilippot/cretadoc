import { getValueByKeyPath, isString, type KeyPathIn } from '@cretadoc/utils';
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

import type { contract } from '../../themes';
import type { ColorContextTokens, ColorTokens } from '../../types';

/**
 * Retrieve a color CSS variable in contract from a color context key.
 *
 * @param {typeof contract} themeContract - The theme contract.
 * @param {keyof ColorContextTokens | 'primary'} color - The context key.
 * @param {Exclude<keyof ColorTokens, 'primary'>} kind - The context kind.
 * @returns {string} The CSS variable that defines the color.
 */
export const getColorFromContract = (
  themeContract: typeof contract,
  color: keyof ColorContextTokens | 'primary',
  kind: Exclude<keyof ColorTokens, 'primary'>
): string => {
  if (color === 'primary') return themeContract.color.primary.base;
  if (color === 'regular') return themeContract.color[kind].regular.base;
  if (color === 'inverted')
    return kind === 'foreground'
      ? themeContract.color.foreground.onInverted.base
      : themeContract.color[kind].inverted.base;

  return themeContract.color[kind][color];
};

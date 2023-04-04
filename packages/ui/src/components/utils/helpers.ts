import { contract } from '../../themes';
import type { ColorContextTokens } from '../../themes/types/tokens';

/**
 * Retrieve the CSS variable for color from color context key.
 *
 * @param {keyof ColorContextTokens | 'primary'} color - The context key.
 * @returns {string} The CSS variable that defines the color.
 */
export const getColorFromTokenKey = (
  color: keyof ColorContextTokens | 'primary'
) => {
  if (color === 'inverted') return contract.color.borders.inverted.base;
  if (color === 'primary') return contract.color.primary.base;
  if (color === 'regular') return contract.color.borders.regular.base;
  return contract.color.borders[color];
};

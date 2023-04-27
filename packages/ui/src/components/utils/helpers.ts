import { contract } from '../../themes';
import type {
  ColorContextTokens,
  ColorTokens,
} from '../../themes/types/tokens';

/**
 * Retrieve the CSS variable for color from color context key.
 *
 * @param {keyof ColorContextTokens | 'primary'} color - The context key.
 * @param {Exclude<keyof ColorTokens, 'primary'>} kind - The context kind.
 * @returns {string} The CSS variable that defines the color.
 */
export const getColorFromTokenKey = (
  color: keyof ColorContextTokens | 'primary',
  kind: Exclude<keyof ColorTokens, 'primary'>
) => {
  if (color === 'primary') return contract.color.primary.base;
  if (color === 'regular') return contract.color[kind].regular.base;
  if (color === 'inverted')
    return kind === 'foreground' ? '' : contract.color[kind].inverted.base;

  return contract.color[kind][color];
};

import type { Maybe } from '../types';

/**
 * Method to remove undefined value from an array.
 *
 * @param {Maybe<T>} value - A possible value.
 * @returns {boolean} True if it is a defined value.
 */
export const removeUndefined = <T>(value: Maybe<T>): value is T => {
  if (value === undefined) return false;
  return true;
};

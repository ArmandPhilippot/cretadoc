import type { Maybe } from '@cretadoc/utils';
import type { ReadDirOptions } from '../../types';
import { DEFAULT_OPTIONS } from '../constants';

/**
 * Merge the user options with the default options.
 *
 * @param {Maybe<Partial<ReadDirOptions>>} options - The user options.
 * @returns {Readonly<ReadDirOptions>}
 */
export const mergeOptionsWithDefault = (
  options: Maybe<Partial<ReadDirOptions>>
): Readonly<ReadDirOptions> => {
  if (!options) return DEFAULT_OPTIONS;

  return Object.freeze({ ...DEFAULT_OPTIONS, ...options });
};

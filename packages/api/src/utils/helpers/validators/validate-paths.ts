import { isAbsolute } from 'path';
import type { DocDirectoryByPathLoader } from '../../../types';

/**
 * Validate a relative path.
 *
 * @param {string} path - The path to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateRelativePath = (path: string): string[] => {
  const errors: string[] = [];

  if (isAbsolute(path)) errors.push('Must be a relative path');

  return errors;
};

/**
 * Validate the parent path of a documentation entry.
 *
 * @param {string} path - The path to validate.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
export const validateParentPath = async (
  path: string,
  loader: DocDirectoryByPathLoader
): Promise<string[]> => {
  const errors: string[] = [...validateRelativePath(path)];

  const maybeDir = await loader.load(path);

  if (!maybeDir) errors.push('The requested directory does not exist');

  return errors;
};

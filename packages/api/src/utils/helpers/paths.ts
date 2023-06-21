import { stat } from 'fs/promises';
import { isAbsolute } from 'path';

/**
 * Check if the given path is a relative path.
 *
 * @param {string} path - A path.
 * @returns {boolean} True if it is a relative path.
 */
export const isRelativePath = (path: string) =>
  path === '.' || path.startsWith('./');

/**
 * Check if a path is absolute and is a directory.
 *
 * @param {string} path - A path.
 * @returns {Promise<boolean>} True if the dir has an absolute path.
 */
export const isAbsoluteDirPath = async (path: string): Promise<boolean> => {
  if (!isAbsolute(path)) return false;

  const stats = await stat(path);

  return stats.isDirectory();
};

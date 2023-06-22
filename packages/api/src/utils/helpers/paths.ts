import { stat } from 'fs/promises';
import { isAbsolute, normalize, relative } from 'path';
import type { ErrorDetails } from 'src/types';
import { CretadocAPIError } from '../exceptions';

/**
 * Normalize a path.
 *
 * It uses the Node's path module under the hood to reduce `..` and `.` parts.
 * Then, it remove the trailing slashes if any.
 *
 * @param path - A path
 * @returns {string} The normalized path.
 */
export const normalizePath = (path: string): string =>
  normalize(path).replace(/\/+$/, '');

/**
 * Check if the given path is in root path.
 *
 * @param {string} root - A root path.
 * @param {string} path - The path to compare.
 * @returns {boolean} True if path starts with root.
 */
export const isPathInRoot = (root: string, path: string): boolean =>
  normalizePath(path).startsWith(normalizePath(root));

/**
 * Retrieve the relative path of `to` compared to `from`.
 *
 * It uses the Node's path module under the hood. Be careful if `to` does not
 * start with `from`, you might have unexpected result. Node will count the
 * depth of `from` and will use this depth to append the same number of `../`
 * in front of `to`. If `to` is an empty string it will use the current working
 * directory path.
 *
 * @example
 * getRelativePath('/absolute/path', '/absolute/path/to/dir') => './to/dir'
 *
 * getRelativePath('/absolute/path', '/another/path/to/dir') => '../../another/path/to/dir'
 *
 * getRelativePath('/absolute/path/', '') => '../../the/cwd/path'
 *
 * @param from - A path
 * @param to - Another path
 * @returns {string} The relative path.
 */
export const getRelativePath = (from: string, to: string): string => {
  const errors: ErrorDetails[] = [];
  if (!isAbsolute(from))
    errors.push({
      errorKind: 'syntax',
      reason: 'from must be an absolute path',
      received: from,
    });

  if (!isAbsolute(to))
    errors.push({
      errorKind: 'syntax',
      reason: 'to must be an absolute path',
      received: to,
    });

  if (!isPathInRoot(from, to))
    errors.push({
      errorKind: 'syntax',
      reason: 'to must start with from path',
      received: to,
    });

  if (errors.length)
    throw new CretadocAPIError('Cannot get relative path', errors);

  const relativePath = relative(from, to);

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

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

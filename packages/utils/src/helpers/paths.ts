import { access, constants } from 'fs/promises';

/**
 * Check if a path is valid.
 *
 * @example isPathExist('/srv') => Promise<true>
 * @example isPathExist('/proc', fs.constants.W_OK) => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @param {number} [mode] - Specifies the accessibility checks to be performed.
 * @returns {Promise<Boolean>} True if the path is valid.
 */
export const isValidPath = async (
  path: string,
  mode: number = constants.F_OK
): Promise<boolean> => {
  try {
    await access(path, mode);
    return true;
  } catch (_err) {
    return false;
  }
};

/**
 * Check if the given path is executable.
 *
 * @example isExecutable('/srv') => Promise<true>
 * @example isExecutable('/var/log/httpd/access_log') => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @returns {Promise<Boolean>} True if the path is executable.
 */
export const isExecutable = async (path: string): Promise<boolean> =>
  isValidPath(path, constants.X_OK);

/**
 * Check if the given path is readable.
 *
 * @example isReadable('/srv') => Promise<true>
 * @example isReadable('/root') => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @returns {Promise<Boolean>} True if the path is readable.
 */
export const isReadable = async (path: string): Promise<boolean> =>
  isValidPath(path, constants.R_OK);

/**
 * Check if the given path is writable.
 *
 * @example isWritable('/srv') => Promise<true>
 * @example isWritable('/proc') => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @returns {Promise<Boolean>} True if the path is writable.
 */
export const isWritable = async (path: string): Promise<boolean> =>
  isValidPath(path, constants.W_OK);

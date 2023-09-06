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
  mode?: number
): Promise<boolean> => {
  try {
    const { access, constants } = await import('fs/promises');
    await access(path, mode ?? constants.F_OK);
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
export const isExecutable = async (path: string): Promise<boolean> => {
  const { constants } = await import('fs/promises');

  return isValidPath(path, constants.X_OK);
};

/**
 * Check if the given path is readable.
 *
 * @example isReadable('/srv') => Promise<true>
 * @example isReadable('/root') => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @returns {Promise<Boolean>} True if the path is readable.
 */
export const isReadable = async (path: string): Promise<boolean> => {
  const { constants } = await import('fs/promises');

  return isValidPath(path, constants.R_OK);
};

/**
 * Check if the given path is writable.
 *
 * @example isWritable('/srv') => Promise<true>
 * @example isWritable('/proc') => Promise<false>
 *
 * @param {string} path - An absolute path.
 * @returns {Promise<Boolean>} True if the path is writable.
 */
export const isWritable = async (path: string): Promise<boolean> => {
  const { constants } = await import('fs/promises');

  return isValidPath(path, constants.W_OK);
};

/**
 * Check if the given path is a relative path.
 *
 * @param {string} path - A path.
 * @returns {boolean} True if it is a relative path.
 */
export const isRelativePath = (path: string) =>
  path === '.' || path.startsWith('./');

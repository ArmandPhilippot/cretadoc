/**
 * Recursively remove the trailing slashes from a string.
 *
 * @param {string} str - A string.
 * @returns {string} The string without trailing slash.
 */
export const removeTrailingSlashes = (str: string): string => {
  if (!str.endsWith('/')) return str;
  return str.replace(/\/+$/g, '');
};

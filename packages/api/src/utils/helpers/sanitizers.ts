import validator from 'validator';

/**
 * Sanitize a string.
 *
 * @param {T} str - A string.
 * @returns {T} The sanitized string.
 */
export const sanitizeString = (str: string): string =>
  validator.escape(validator.trim(str));

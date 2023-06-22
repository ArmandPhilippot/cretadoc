import { isUndefined, type Maybe } from '@cretadoc/utils';
import { MARKDOWN_EXTENSION } from '../constants';

/**
 * Transform a string to a buffer converted in base64 string.
 *
 * @param {string} value - A string to transform.
 * @returns {string} A base64 string.
 */
export const generateBase64String = (value: string): string =>
  Buffer.from(value, 'utf8').toString('base64');

/**
 * Transform a buffer converted in base64 string to a string.
 *
 * @param {string} value - A string to decode.
 * @returns {string} An utf8 string.
 */
export const decodeBase64String = (value: string): string =>
  Buffer.from(value, 'base64').toString('utf8');

/**
 * Generate a string id.
 *
 * @param {string} prefix - A prefix.
 * @param {number} id - A numeric id.
 * @returns {string} A string id.
 */
export const generatePrefixedId = (prefix: string, id: number): string =>
  generateBase64String(`${prefix}${id}`);

/**
 * Retrieve a numeric id from a prefixed string id.
 *
 * @param {string} prefix - The id prefix.
 * @param {string} id - The string id.
 * @returns {number} The numeric id.
 */
export const decodePrefixedId = (prefix: string, id: string): number =>
  parseInt(decodeBase64String(id).replace(prefix, ''), 10);

/**
 * Generate a cursor from a number (an id for example).
 *
 * @param {number} num - A number.
 * @returns {string} The cursor.
 */
export const generateCursor = (num: number): string =>
  generatePrefixedId('cursor', num);

/**
 * Transform a cursor to a number.
 *
 * @param {Maybe<string>} cursor - A cursor.
 * @returns {number} A number.
 */
export const decodeCursor = (cursor: Maybe<string>): number => {
  if (isUndefined(cursor)) return 0;
  return decodePrefixedId('cursor', cursor);
};

/**
 * Check if the given string ends with a markdown extension.
 *
 * @param {string} str - A string.
 * @returns {boolean} True if it is a markdown file.
 */
export const isMarkdownFile = (str: string): boolean =>
  str.endsWith(MARKDOWN_EXTENSION);

/**
 * Add a markdown extension to the filename if needed.
 *
 * @param {string} filename - The filename.
 * @returns {string} The filename with `.md` extension.
 */
export const getFilenameWithExt = (filename: string): string => {
  if (filename.endsWith(MARKDOWN_EXTENSION)) return filename;

  return `${filename}${MARKDOWN_EXTENSION}`;
};

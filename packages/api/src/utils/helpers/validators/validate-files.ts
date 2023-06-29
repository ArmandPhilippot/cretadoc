import { decodeBase64String } from '../strings';
import { validateString } from './validate-strings';

/**
 * Validate a file contents.
 *
 * @param {string} contents - The contents to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateFileContents = (contents: string): string[] =>
  validateString(contents, { lengthRange: { min: 0 } });

/**
 * Check if a filename contains forbidden characters.
 *
 * @param {string} filename - The filename.
 * @returns {boolean} True if it does not contain forbidden characters.
 */
export const isValidFilename = (filename: string): boolean => {
  // eslint-disable-next-line no-control-regex
  const unicodeControlCharRegex = /[\u0000-\u001F]/g;
  const forbiddenCharRegex = /[<>:"/\\|?*]/g;
  const windowsReservedNameRegex = /^(?:con|prn|aux|nul|com\d|lpt\d)$/i;

  return (
    !unicodeControlCharRegex.test(filename) &&
    !forbiddenCharRegex.test(filename) &&
    !windowsReservedNameRegex.test(filename)
  );
};

/**
 * Validate a filename.
 *
 * @param {string} filename - A filename to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateFilename = (filename: string): string[] => {
  const nameLength = {
    min: 1,
    max: 255,
  };
  const errors: string[] = [
    ...validateString(filename, { lengthRange: nameLength }),
  ];

  if (!isValidFilename(filename)) errors.push('Invalid characters');

  return errors;
};

/**
 * Validate a file id.
 *
 * @param {string} id - The id to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateFileId = (id: string): string[] => {
  const errors: string[] = [];
  const decodedId = decodeBase64String(id);

  if (!decodedId.startsWith('./')) errors.push('Invalid id');

  return errors;
};

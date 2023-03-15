import { isString } from '@cretadoc/utils';
import validator from 'validator';
import type { ValidationErrors } from '../../types';
import { error } from '../errors/messages';

/**
 * Init the validation errors.
 *
 * @param {T} obj - The object to validate.
 * @returns {ValidationErrors<T>} An object with all properties to validate.
 */
export const initValidationErrors = <T extends Record<string, unknown>>(
  obj: T
): ValidationErrors<T> => {
  const keyErrors = Object.keys(obj).map<[keyof T, string[]]>((key) => [
    key,
    [],
  ]);

  return Object.fromEntries<string[]>(keyErrors) as ValidationErrors<T>;
};

/**
 * Check if any property has validation errors.
 *
 * @param {ValidationErrors<T>} obj - The validation errors object.
 * @returns {boolean} True if at least one property has errors.
 */
export const hasValidationErrors = <T>(obj: ValidationErrors<T>): boolean =>
  Object.values<string[]>(obj).some((errors) => errors.length > 0);

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
  const errors: string[] = [];
  const nameLength = {
    min: 1,
    max: 255,
  };

  if (!isString(filename)) errors.push(error.invalid.type('string'));

  if (!validator.isLength(filename, nameLength))
    errors.push(error.validation.string.length(nameLength));

  if (!isValidFilename(filename)) errors.push(error.validation.file.name);

  return errors;
};

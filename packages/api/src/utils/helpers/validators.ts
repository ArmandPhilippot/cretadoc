import { isAbsolute } from 'path';
import { isString } from '@cretadoc/utils';
import validator from 'validator';
import type { Meta, ValidationErrors } from '../../types';

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

  if (!isString(filename)) errors.push('Must be a string');

  if (!validator.isLength(filename, nameLength))
    errors.push(
      `Must be between ${nameLength.min} and ${nameLength.max} characters`
    );

  if (!isValidFilename(filename)) errors.push('Invalid characters');

  return errors;
};

/**
 * Validate a relative path.
 *
 * @param {string} path - The path to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateRelativePath = (path: string): string[] => {
  const errors: string[] = [];

  if (isAbsolute(path)) errors.push('Must be a relative path');

  return errors;
};

/**
 * Validate a date.
 *
 * @param {string} date - The date to validate.
 * @param {string} [format]  - The expected date format
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateDate = (date: string, format = 'YYYY-MM-DD'): string[] => {
  const errors: string[] = [];

  if (!validator.isDate(date, { format }))
    errors.push(`Invalid date format, should be ${format}`);

  return errors;
};

/**
 * Validate a time compared to `HH:MM:SS` format.
 *
 * @param {string} time - The time to validate.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateTime = (time: string): string[] => {
  const errors: string[] = [];

  if (!validator.isTime(time, { hourFormat: 'hour24', mode: 'withSeconds' }))
    errors.push(`Invalid time format, should be HH:MM:SS`);

  return errors;
};

/**
 * Validate a date with time.
 *
 * @param {string} dateTime - The datetime to validate.
 * @param {string} [format]  - The expected date format
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateDateTime = (
  dateTime: string,
  format = 'YYYY-MM-DD'
): string[] => {
  const [date, time, ..._rest] = dateTime.split(' ');

  if (!date)
    return [
      `Invalid date, expected one of these formats: ${format} or ${format} HH:MM:SS`,
    ];

  const errors = [...validateDate(date, format)];

  if (time) errors.push(...validateTime(time));

  return errors;
};

/**
 * Validate the status of file.
 *
 * @param {string} status - The status to validate.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateFileStatus = (status: string): string[] => {
  const errors: string[] = [];
  const validStatus = ['draft', 'published'];

  if (!validStatus.includes(status))
    errors.push(`Invalid status, should be one of ${validStatus.join(', ')}`);

  return errors;
};

type ValidateStringOptions = {
  lengthRange?: {
    min?: number;
    max?: number;
  };
};

/**
 * Validate a string.
 *
 * @param {string} str - A string to validate.
 * @param {ValidateStringOptions} options - Some validation options.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateString = (
  str: string,
  options?: ValidateStringOptions
): string[] => {
  const errors: string[] = [];

  if (
    options?.lengthRange &&
    !validator.isLength(str, {
      max: options.lengthRange.max,
      min: options.lengthRange.min,
    })
  )
    errors.push(
      `Invalid length, should be between ${options.lengthRange.min ?? 0} and ${
        options.lengthRange.max ?? 'unlimited'
      } characters`
    );

  return errors;
};

/**
 * Validate a meta key/value pair.
 *
 * @param {keyof Meta} key - The meta key.
 * @param {string} value - The meta value.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateMetaKeyValue = (
  key: keyof Meta,
  value: string
): string[] => {
  switch (key) {
    case 'createdAt':
    case 'updatedAt':
      return validateDateTime(value);
    case 'seoDescription':
    case 'seoTitle':
      return validateString(value, { lengthRange: { min: 1 } });
    case 'status':
      return validateFileStatus(value);
    case 'title':
    default:
      return validateString(value, { lengthRange: { min: 1, max: 150 } });
  }
};

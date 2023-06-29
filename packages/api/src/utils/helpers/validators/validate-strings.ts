import { isString } from '@cretadoc/utils';
import validator from 'validator';

type ValidateStringOptions = {
  lengthRange?: {
    min?: number;
    max?: number;
  };
};

/**
 * Validate a string.
 *
 * @param {unknown} str - A string to validate.
 * @param {ValidateStringOptions} options - Some validation options.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateString = (
  str: unknown,
  options?: ValidateStringOptions
): string[] => {
  if (!isString(str)) return ['Must be a string'];

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

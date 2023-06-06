import { isNull, isString } from '@cretadoc/utils';
import type { ValidationError } from '../../../types/internals';

/**
 * Validate the copyright property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateCopyrightProp = (value: unknown): ValidationError[] => {
  if (isNull(value) || isString(value)) return [];

  return [
    {
      key: 'copyright',
      reason: 'string or null expected',
      received: typeof value,
    },
  ];
};

import { isString } from '@cretadoc/utils';
import type { ValidationError } from '../../../types/internals';

/**
 * Validate the name property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateNameProp = (value: unknown): ValidationError[] => {
  if (isString(value)) return [];

  return [
    {
      key: 'name',
      reason: 'string expected',
      received: typeof value,
    },
  ];
};

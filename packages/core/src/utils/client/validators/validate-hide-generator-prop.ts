import { isBoolean } from '@cretadoc/utils';
import type { ValidationError } from '../../../types/internals';

/**
 * Validate the hideGenerator property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateHideGeneratorProp = (
  value: unknown
): ValidationError[] => {
  if (isBoolean(value)) return [];

  return [
    {
      key: 'hideGenerator',
      reason: 'boolean expected',
      received: typeof value,
    },
  ];
};

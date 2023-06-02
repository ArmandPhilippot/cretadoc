import { isString } from '@cretadoc/utils';
import type { ValidationError } from '../../../types/internals';
import { isSupportedLocale } from './is-supported-locale';

/**
 * Validate the locale property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateLocaleProp = (value: unknown): ValidationError[] => {
  if (!isString(value))
    return [
      {
        key: 'locale',
        reason: `string expected`,
        received: typeof value,
      },
    ];

  if (!isSupportedLocale(value))
    return [
      {
        key: 'locale',
        reason: `not supported`,
        received: value,
      },
    ];

  return [];
};

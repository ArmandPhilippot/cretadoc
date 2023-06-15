import { type Maybe, isNull, isObject, isString } from '@cretadoc/utils';
import type { CretadocPages } from '../../../types';
import type { ValidationError } from '../../../types/internals';

/**
 * Check if the given pages key can be nullable.
 *
 * @param {string} key - The key to check.
 * @returns {boolean} True if the key is nullable.
 */
const isNullablePage = (key: string): boolean => {
  const nullablePages: Array<keyof CretadocPages> = ['legalNotice'];

  return (nullablePages as string[]).includes(key);
};

/**
 * Validate a property in pages config.
 *
 * @param {string} key - The key to validate.
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validatePagesKeyValue = (
  key: string,
  value: unknown
): ValidationError[] => {
  let reason: Maybe<string> = undefined;

  if (isNullablePage(key)) {
    if (!isString(value) && !isNull(value))
      reason = `${key} must be a string or null`;
  } else if (!isString(value)) reason = `${key} must be a string`;

  return reason
    ? [
        {
          key: 'pages',
          reason,
          received: typeof value,
        },
      ]
    : [];
};

/**
 * Validate the pages property.
 *
 * @param {unknown} config - The config to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validatePagesProp = (config: unknown): ValidationError[] => {
  if (!isObject(config))
    return [
      {
        key: 'pages',
        reason: `object expected`,
        received: typeof config,
      },
    ];

  const errors: ValidationError[] = [];

  for (const [key, value] of Object.entries(config))
    errors.push(...validatePagesKeyValue(key, value));

  return errors;
};

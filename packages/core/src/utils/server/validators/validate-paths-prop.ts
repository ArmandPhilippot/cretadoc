import { existsSync } from 'node:fs';
import { isNull, isObject, isString } from '@cretadoc/utils';
import type { CretadocPaths } from '../../../types/config';
import type { ValidationError } from '../../../types/internals';

/**
 * Check if the given path is an existing directory.
 *
 * @param {string} path - The path to validate.
 * @returns {boolean} True if it is a directory.
 */
const isDirectory = (path: string): boolean => existsSync(path);

/**
 * Validate the a key/value pair in paths property.
 *
 * @param {string} key - The key to validate.
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validatePathsKeyValue = (
  key: string,
  value: unknown
): ValidationError[] => {
  if (isNull(value)) return [];

  if (!isString(value))
    return [
      {
        key: 'paths',
        reason: `string or null expected in ${key} property`,
        received: typeof value,
      },
    ];

  if (!isDirectory(value))
    return [
      {
        key: 'paths',
        reason: `existing directory expected in ${key} property`,
        received: value,
      },
    ];

  return [];
};

/**
 * Validate the paths property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validatePathsProp = (config: unknown): ValidationError[] => {
  if (!isObject(config))
    return [
      {
        key: 'paths',
        reason: 'object expected',
        received: typeof config,
      },
    ];

  const errors: ValidationError[] = [];
  const validKeys: string[] = ['doc', 'pages'] satisfies Array<
    keyof CretadocPaths
  >;

  for (const [key, value] of Object.entries(config))
    if (validKeys.includes(key))
      errors.push(...validatePathsKeyValue(key, value));
    else
      errors.push({
        key: 'paths',
        reason: 'unknown key',
        received: key,
      });

  return errors;
};

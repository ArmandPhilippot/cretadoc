import type { ThemeScheme } from '@cretadoc/ui';
import { isObjKeyExist, isObject, isString } from '@cretadoc/utils';
import type { ValidationError } from '../../../types/internals';
import { isSupportedTheme } from './is-supported-theme';

/**
 * Validate a single theme.
 *
 * @param {unknown} theme - Maybe an existing theme.
 * @param {ThemeScheme} [scheme] - The theme scheme.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validateSingleTheme = (
  theme: unknown,
  scheme?: ThemeScheme
): ValidationError[] => {
  const inSchemeProp = scheme ? `${scheme} property: ` : '';

  if (!isString(theme))
    return [
      {
        key: 'theme',
        reason: `${inSchemeProp}string expected`,
        received: typeof theme,
      },
    ];

  if (!isSupportedTheme(theme))
    return [
      {
        key: 'theme',
        reason: `${inSchemeProp}invalid theme`,
        received: theme,
      },
    ];

  return [];
};

/**
 * Validate the theme scheme properties.
 *
 * @param {Record<PropertyKey, unknown>} theme - The object to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validateThemeSchemes = (
  theme: Record<PropertyKey, unknown>
): ValidationError[] => {
  if (!isObjKeyExist(theme, 'dark') || !isObjKeyExist(theme, 'light'))
    return [
      {
        key: 'theme',
        reason: 'dark and light properties expected',
        received: Object.keys(theme).join(', '),
      },
    ];

  return [
    ...validateSingleTheme(theme.dark, 'dark'),
    ...validateSingleTheme(theme.light, 'light'),
  ];
};

/**
 * Validate the theme property.
 *
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateThemeProp = (value: unknown): ValidationError[] => {
  if (isString(value)) return validateSingleTheme(value);

  if (isObject(value)) return validateThemeSchemes(value);

  return [
    {
      key: 'theme',
      reason: 'string or object expected',
      received: typeof value,
    },
  ];
};

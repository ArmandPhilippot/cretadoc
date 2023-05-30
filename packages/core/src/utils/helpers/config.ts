import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  isValidThemeId,
  isValidDarkThemeId,
  isValidLightThemeId,
  type ThemeScheme,
} from '@cretadoc/ui';
import {
  isString,
  isObject,
  isBoolean,
  isObjKeyExist,
  type Maybe,
} from '@cretadoc/utils';
import { findUp } from 'find-up';
import type { CretadocConfig } from '../../types/config';
import {
  CONFIG_FILE_NAME,
  DEFAULT_CONFIG,
  ERROR,
  SUPPORTED_LOCALES,
} from '../constants';
import { ConfigError } from '../exceptions';

/**
 * Retrieve the right validator depending on the value typeof.
 *
 * @param {string} valueType - The value typeof to validate.
 * @returns {(value: unknown) => boolean} A validator for the given value.
 */
const getValidator = (valueType: string) => {
  switch (valueType) {
    case 'boolean':
      return isBoolean;
    case 'string':
      return isString;
    default:
      throw new ConfigError(ERROR.UNEXPECTED);
  }
};

/**
 * Validate the given key/value pair.
 *
 * @param {keyof CretadocConfig} key - A config key to validate.
 * @param {string} expected - The expected type.
 * @param {unknown} value - The value to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
const validateKeyType = (
  key: keyof CretadocConfig,
  expected: string,
  value: unknown
): string[] => {
  const validator = getValidator(expected);
  if (validator(value)) return [];

  return [`${key}: ${ERROR.INVALID.TYPE(expected, typeof value)}`];
};

/**
 * Validate the locale property.
 *
 * @param {unknown} locale - The value of the locale property.
 * @returns {string[]} An array of errors or an empty array.
 */
const validateLocale = (locale: unknown): string[] => {
  if (!isString(locale))
    return [`locale: ${ERROR.INVALID.TYPE('string', typeof locale)}`];
  if ((SUPPORTED_LOCALES as readonly string[]).includes(locale)) return [];

  return [`locale: ${ERROR.INVALID.CONFIG.LOCALE(locale)}`];
};

/**
 * Check if the given theme id matches an existing theme.
 *
 * @param {string} id - A theme id.
 * @param {Maybe<ThemeScheme>} scheme - Maybe a theme scheme.
 * @returns {boolean} True if it is a valid theme.
 */
const isValidTheme = (id: string, scheme: Maybe<ThemeScheme>): boolean => {
  if (scheme === 'light') return isValidLightThemeId(id);
  if (scheme === 'dark') return isValidDarkThemeId(id);
  return isValidThemeId(id);
};

/**
 * Validate the theme property when a single theme is provided.
 *
 * @param {unknown} theme - Maybe an existing theme.
 * @param {ThemeScheme} [scheme] - The theme scheme.
 * @returns {string[]} An array of errors or an empty array.
 */
const validateSingleTheme = (
  theme: unknown,
  scheme?: ThemeScheme
): string[] => {
  const themeKey = scheme ? `theme.${scheme}` : 'theme';

  if (!isString(theme))
    return [`${themeKey}: ${ERROR.INVALID.TYPE('string', typeof theme)}`];

  if (isValidTheme(theme, scheme)) return [];

  return [`${themeKey}: ${ERROR.INVALID.CONFIG.THEME.VALUE(theme, scheme)}`];
};

/**
 * Validate the dark theme and light theme properties.
 *
 * @param {Record<PropertyKey, unknown>} themes - The theme value.
 * @returns {string[]} An array of errors or an empty array.
 */
const validateLightDarkThemes = (
  themes: Record<PropertyKey, unknown>
): string[] => {
  if (!isObjKeyExist(themes, 'dark') || !isObjKeyExist(themes, 'light'))
    return [`theme: ${ERROR.INVALID.CONFIG.THEME.FORMAT}`];

  return [
    ...validateSingleTheme(themes.dark, 'dark'),
    ...validateSingleTheme(themes.light, 'light'),
  ];
};

/**
 * Validate the theme property.
 *
 * @param {unknown} theme - The value of the theme property.
 * @returns {string[]} An array of errors or an empty array.
 */
const validateTheme = (theme: unknown): string[] => {
  if (isObject(theme)) return validateLightDarkThemes(theme);
  if (isString(theme)) return validateSingleTheme(theme);

  return validateKeyType('theme', 'string or object', typeof theme);
};

/**
 * Convert an array of errors to a string.
 *
 * @param {string[]} errors - An array of error messages.
 * @returns {string} The formatted errors.
 */
const formatErrors = (errors: string[]): string => {
  const errorsList = errors.map((error) => `- ${error}\n`);

  return `Invalid configuration file:\n${errorsList.join('')}`;
};

/**
 * Check if the given configuration is valid.
 *
 * @param {Record<PropertyKey, unknown>} config - The configuration to validate.
 * @returns {boolean} True if the configuration is valid.
 */
const isValidConfig = (
  config: Record<PropertyKey, unknown>
): config is Partial<CretadocConfig> => {
  const errors = [...validateKeyType('name', 'string', config['name'])];

  if (config['locale']) errors.push(...validateLocale(config['locale']));
  if (config['theme']) errors.push(...validateTheme(config['theme']));
  if (errors.length) throw new ConfigError(formatErrors(errors));

  return true;
};

/**
 * Merge the user configuration with defaults.
 *
 * @param {Partial<CretadocConfig>} config - A partial configuration object.
 * @returns {CretadocConfig} The configuration.
 */
export const mergeConfigWithDefaults = (
  config: Partial<CretadocConfig>
): CretadocConfig => {
  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
};

/**
 * Validate a configuration.
 *
 * @param {unknown} config - The configuration to validate.
 * @returns {CretadocConfig} The valid configuration.
 */
export const validateConfig = (config: unknown): CretadocConfig => {
  if (!isObject(config)) throw new ConfigError(ERROR.EMPTY.CONFIG);
  if (isValidConfig(config)) return mergeConfigWithDefaults(config);

  throw new ConfigError(ERROR.UNEXPECTED);
};

/**
 * Load the Cretadoc configuration.
 *
 * @returns {Promise<CretadocConfig>} The configuration.
 */
export const loadConfig = async (): Promise<CretadocConfig> => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const configPath = await findUp(CONFIG_FILE_NAME, { cwd: currentDir });

  if (!configPath) throw new ConfigError(ERROR.MISSING.CONFIG);

  const config = (await import(/* @vite-ignore */ configPath)) as {
    default: unknown;
  };

  return validateConfig(config.default);
};

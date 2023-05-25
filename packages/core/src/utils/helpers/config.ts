import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isString, isObject } from '@cretadoc/utils';
import { findUp } from 'find-up';
import type { CretadocConfig } from '../../types/config';
import { CONFIG_FILE_NAME, ERROR } from '../constants';
import { ConfigError } from '../exceptions';

/**
 * Validate the value of the name key.
 *
 * @param {unknown} value - The name to validate.
 * @returns {string[]} An empty array or an array of errors.
 */
const validateName = (value: unknown): string[] => {
  if (isString(value)) return [];

  return [`name: ${ERROR.INVALID.TYPE('string', typeof value)}`];
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
): config is CretadocConfig => {
  const errors = [...validateName(config['name'])];

  if (errors.length) throw new ConfigError(formatErrors(errors));

  return true;
};

/**
 * Validate a configuration.
 *
 * @param {unknown} config - The configuration to validate.
 * @returns {CretadocConfig} The valid configuration.
 */
export const validateConfig = (config: unknown): CretadocConfig => {
  if (!isObject(config)) throw new ConfigError(ERROR.EMPTY.CONFIG);

  if (isValidConfig(config))
    return {
      name: config.name,
    };

  throw new ConfigError(ERROR.UNEXPECTED);
};

/**
 * Load the Cretadoc configuration.
 *
 * @returns {CretadocConfig} The configuration.
 */
export const loadConfig = async () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const configPath = await findUp(CONFIG_FILE_NAME, { cwd: currentDir });

  if (!configPath) throw new ConfigError(ERROR.MISSING.CONFIG);

  const config = (await import(/* @vite-ignore */ configPath)) as {
    default: unknown;
  };

  return validateConfig(config.default);
};

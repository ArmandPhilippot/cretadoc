import { isObject } from '@cretadoc/utils';
import type { CretadocConfig } from '../../types/config';
import { CONFIG_FILE_NAME, DEFAULT_CONFIG } from '../constants';
import { ConfigError, ConfigValidationError } from '../exceptions';
import { validateConfigProps } from './validators';

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
 * Retrieve a full configuration object.
 *
 * @param {unknown} config - The configuration to validate and merge.
 * @returns {CretadocConfig} A full configuration object.
 */
export const getFullConfigFrom = (config: unknown): CretadocConfig => {
  if (!isObject(config))
    throw new ConfigError(
      `Found a ${CONFIG_FILE_NAME} file but it does not export a configuration. Some keys are required for Cretadoc to work properly.`
    );

  const errors = validateConfigProps(config);
  const isValid = !errors.length;

  if (isValid) return mergeConfigWithDefaults(config);

  throw new ConfigValidationError(errors);
};

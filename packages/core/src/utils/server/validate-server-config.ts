import type {
  CretadocServerConfig,
  LooseAutocomplete,
  ServerConfigShape,
  ValidationError,
} from '../../types';
import { ConfigError } from '../exceptions';
import { validatePathsProp } from './validators';

/**
 * Validate a server configuration property.
 *
 * @param {LooseAutocomplete<keyof CretadocServerConfig>} key - The key.
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validateServerConfigProp = (
  key: LooseAutocomplete<keyof CretadocServerConfig>,
  value: unknown
): ValidationError[] => {
  if (key === 'paths') return validatePathsProp(value);

  throw new ConfigError(`Invalid property. Received: ${String(key)}`);
};

/**
 * Validate the given server configuration.
 *
 * @param {ServerConfigShape} config - A configuration object.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateServerConfig = (
  config: ServerConfigShape
): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (const [key, value] of Object.entries(config))
    errors.push(...validateServerConfigProp(key, value));

  return errors;
};

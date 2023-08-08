import type {
  ClientConfigShape,
  CretadocClientConfig,
  LooseAutocomplete,
  ValidationError,
} from '../../types';
import { ConfigError } from '../exceptions';
import {
  validateCopyrightProp,
  validateDocProp,
  validateHideGeneratorProp,
  validateLocaleProp,
  validateNameProp,
  validatePagesProp,
  validateThemeProp,
} from './validators';

/**
 * Validate a client configuration property.
 *
 * @param {LooseAutocomplete<keyof CretadocClientConfig>} key - The key.
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validateClientConfigProp = (
  key: LooseAutocomplete<keyof CretadocClientConfig>,
  value: unknown
): ValidationError[] => {
  switch (key) {
    case 'copyright':
      return validateCopyrightProp(value);
    case 'doc':
      return validateDocProp(value);
    case 'hideGenerator':
      return validateHideGeneratorProp(value);
    case 'locale':
      return validateLocaleProp(value);
    case 'name':
      return validateNameProp(value);
    case 'pages':
      return validatePagesProp(value);
    case 'theme':
      return validateThemeProp(value);
    default: {
      throw new ConfigError(`Invalid property. Received: ${String(key)}`);
    }
  }
};

/**
 * Validate the given client configuration.
 *
 * @param {ClientConfigShape} config - A configuration object.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateClientConfig = (
  config: ClientConfigShape
): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (const [key, value] of Object.entries(config))
    errors.push(...validateClientConfigProp(key, value));

  return errors;
};

import type { CretadocConfig } from '../../../types/config';
import type {
  LooseAutocomplete,
  ValidationError,
} from '../../../types/internals';
import { ConfigError } from '../../exceptions';
import { validateCopyrightProp } from './validate-copyright-prop';
import { validateHideGeneratorProp } from './validate-hide-generator-prop';
import { validateLocaleProp } from './validate-locale-prop';
import { validateNameProp } from './validate-name-prop';
import { validateThemeProp } from './validate-theme-prop';

/**
 * Validate a configuration property.
 *
 * @param {LooseAutocomplete<keyof CretadocConfig>} key - The key to validate.
 * @param {unknown} value - The value to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
const validateConfigProperties = (
  key: LooseAutocomplete<keyof CretadocConfig>,
  value: unknown
): ValidationError[] => {
  switch (key) {
    case 'copyright':
      return validateCopyrightProp(value);
    case 'hideGenerator':
      return validateHideGeneratorProp(value);
    case 'locale':
      return validateLocaleProp(value);
    case 'name':
      return validateNameProp(value);
    case 'theme':
      return validateThemeProp(value);
    default: {
      throw new ConfigError(`Invalid property. Received: ${String(key)}`);
    }
  }
};

/**
 * Validate the given configuration.
 *
 * @param config - A configuration to validate.
 * @returns {ValidationError[]} An array of errors or an empty array.
 */
export const validateConfigProps = (
  config: Record<PropertyKey, unknown>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (const [key, value] of Object.entries(config))
    errors.push(...validateConfigProperties(key, value));

  return errors;
};

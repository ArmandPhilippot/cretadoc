import { isObject } from '@cretadoc/utils';
import { DEFAULT_CONFIG } from '../constants';
import { ConfigError } from '../exceptions';

type CompareConfigKeysReturn = {
  extraKeys: string[];
  hasValidKey: boolean;
};

/**
 * Compare the valid config keys with the received ones.
 *
 * @param {string[]} validKeys - An array of valid keys.
 * @param {string[]} receivedKeys - The keys to validate.
 * @returns {CompareConfigKeysReturn} An object with keys info.
 */
const compareConfigKeys = (
  validKeys: string[],
  receivedKeys: string[]
): CompareConfigKeysReturn => {
  return {
    extraKeys: receivedKeys.filter((key) => !validKeys.includes(key)),
    hasValidKey: validKeys.some((key) => receivedKeys.includes(key)),
  };
};

/**
 * Check if the given configuration object has a valid shape.
 *
 * @param {unknown} config - A configuration object to validate.
 * @returns {boolean} True if the config shape is valid.
 */
export const isConfigShapeValid = <T extends Record<string, unknown>>(
  config: unknown
): config is T => {
  if (!isObject(config))
    throw new ConfigError(
      `Configuration file found but it does not export a configuration.`
    );

  const { extraKeys, hasValidKey } = compareConfigKeys(
    Object.keys(DEFAULT_CONFIG),
    Object.keys(config)
  );
  const hasExtraKeys = extraKeys.length > 0;

  if (hasExtraKeys)
    console.warn(
      `[config]: Your configuration contains invalid properties. You should remove them to avoid unexpected behavior in the future. Received: ${extraKeys.join(
        ', '
      )}`
    );

  return hasValidKey;
};

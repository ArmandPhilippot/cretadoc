import {
  type LiteralUnion,
  type Maybe,
  deepFreeze,
  isBoolean,
  isObjKeyExist,
  isObject,
  isString,
  isUndefined,
  type ReadonlyDeep,
} from '@cretadoc/utils';
import type { APIConfig, APIDataConfig, ErrorDetails } from '../../types';
import { DEFAULT_CONFIG } from '../constants';
import { CretadocAPIError } from '../exceptions';
import { isDirectory } from './paths';

/**
 * Check if the given key/value pair is valid.
 *
 * @param {LiteralUnion<keyof APIDataConfig, string>} key - A config key.
 * @param {unknown} value - The corresponding value.
 * @returns {Promise<Array<ErrorDetails<APIConfig>>>} The validation errors.
 */
const validateDataConfigKeyValue = async (
  key: LiteralUnion<keyof APIDataConfig, string>,
  value: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  if (key !== 'doc' && key !== 'pages')
    return [
      {
        errorKind: 'syntax',
        key: 'data',
        reason: `Received an unknown config key.`,
        received: key,
      },
    ];

  if (!isObject(value))
    return [
      {
        errorKind: 'type',
        key: 'data',
        reason: `${key} must be an object`,
        received: typeof value,
      },
    ];

  if (!isObjKeyExist(value, 'baseUrl') || !isObjKeyExist(value, 'path'))
    return [
      {
        errorKind: 'reference',
        key: 'data',
        reason: `${key} must have both a baseUrl key and a path key`,
        received: Object.keys(value).join(', '),
      },
    ];

  const errors: Array<ErrorDetails<APIConfig>> = [];

  if (!isString(value.baseUrl))
    errors.push({
      errorKind: 'type',
      key: 'data',
      reason: `${key} baseUrl must be a string`,
      received: typeof value.baseUrl,
    });

  if (!isString(value.path))
    errors.push({
      errorKind: 'type',
      key: 'data',
      reason: `${key} path must be a string`,
      received: typeof value.path,
    });
  else if (!(await isDirectory(value.path)))
    errors.push({
      errorKind: 'range',
      key: 'data',
      reason: `${key} path must be an existent directory`,
      received: value.path,
    });

  return errors;
};

/**
 * Check if the value of the data key is valid.
 *
 * @param {unknown} config - The value of the data key
 * @returns {Promise<Array<ErrorDetails<APIConfig>>>} The validation errors.
 */
const validateDataKey = async (
  config: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  if (!isObject(config))
    return [
      {
        errorKind: 'type',
        key: 'data',
        reason: 'must be an object',
        received: typeof config,
      },
    ];

  const dataEntries = Object.entries(config) as Array<
    [keyof APIDataConfig, unknown]
  >;
  const promises = dataEntries.map(async ([key, value]) =>
    validateDataConfigKeyValue(key, value)
  );
  const awaitedPromises = await Promise.all(promises);

  return awaitedPromises.flat();
};

/**
 * Check if the value of the endpoint key is valid.
 *
 * @param {unknown} config - The value of the endpoint key
 * @returns {Array<ErrorDetails<APIConfig>>} The validation errors.
 */
const validateEndpointKey = (
  config: unknown
): Array<ErrorDetails<APIConfig>> => {
  if (!isString(config))
    return [
      {
        errorKind: 'type',
        key: 'endpoint',
        reason: 'must be a string',
        received: typeof config,
      },
    ];

  if (!config.startsWith('/'))
    return [
      {
        errorKind: 'type',
        key: 'endpoint',
        reason: 'should start with a slash (/)',
        received: typeof config,
      },
    ];

  return [];
};

/**
 * Check if the value of the graphiql key is valid.
 *
 * @param {unknown} config - The value of the graphiql key
 * @returns {Array<ErrorDetails<APIConfig>>} The validation errors.
 */
const validateGraphiQLKey = (
  config: unknown
): Array<ErrorDetails<APIConfig>> => {
  if (isBoolean(config)) return [];

  return [
    {
      errorKind: 'type',
      key: 'graphiql',
      reason: 'must be a boolean value',
      received: typeof config,
    },
  ];
};

/**
 * Check if the given key/value pair is valid.
 *
 * @param {keyof APIConfig} key - A config key.
 * @param {unknown} value - The corresponding value.
 * @returns {Promise<Array<ErrorDetails<APIConfig>>>} The validation errors.
 */
const validateConfigKeyValue = async (
  key: keyof APIConfig,
  value: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  switch (key) {
    case 'data':
      return validateDataKey(value);
    case 'endpoint':
      return validateEndpointKey(value);
    case 'graphiql':
      return validateGraphiQLKey(value);
    default:
      throw new CretadocAPIError('Invalid configuration key', {
        errorKind: 'syntax',
        reason: `Received an unknown config key.`,
        received: key,
      });
  }
};

/**
 * Check if the given configuration is valid.
 *
 * @param {Partial<APIConfig>} config - The user config.
 * @returns {Promise<Array<ErrorDetails<APIConfig>>>} The validation errors.
 */
const validateUserConfig = async (
  config: Partial<APIConfig>
): Promise<Array<ErrorDetails<APIConfig>>> => {
  const entries = Object.entries(config) as Array<
    [keyof typeof config, unknown]
  >;
  const promises = entries.map(async ([key, value]) => {
    if (isUndefined(value)) return [];
    return validateConfigKeyValue(key, value);
  });
  const awaitedPromises = await Promise.all(promises);

  return awaitedPromises.flat();
};

/**
 * Merge the consumer configuration with the default configuration.
 *
 * @param {Maybe<Partial<APIConfig>>} config - The consumer config.
 * @returns {Promise<ReadonlyDeep<APIConfig>>} The full configuration.
 */
export const mergeConfig = async (
  config: Maybe<Partial<APIConfig>>
): Promise<ReadonlyDeep<APIConfig>> => {
  if (!config) return DEFAULT_CONFIG;

  const errors = await validateUserConfig(config);

  if (errors.length)
    throw new CretadocAPIError('Invalid configuration', errors);

  return deepFreeze({
    ...DEFAULT_CONFIG,
    ...config,
    data: config.data ?? DEFAULT_CONFIG.data,
  });
};

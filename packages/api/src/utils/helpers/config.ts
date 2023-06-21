import {
  type PartialDeep,
  isBoolean,
  isObjKeyExist,
  isObject,
  isString,
  isUndefined,
  type Maybe,
} from '@cretadoc/utils';
import type { APIConfig, APIDataConfig, ErrorDetails } from '../../types';
import { DEFAULT_CONFIG } from '../constants';
import { CretadocAPIError } from '../exceptions';
import { isAbsoluteDirPath } from './paths';

export const validateDataKeyValue = async (
  key: keyof APIDataConfig,
  value: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  if (!isString(value))
    return [
      {
        errorKind: 'type',
        key: 'data',
        reason: `${key} must be a string`,
        received: typeof value,
      },
    ];

  const isDir = await isAbsoluteDirPath(value);

  if (!isDir)
    return [
      {
        errorKind: 'reference',
        key: 'data',
        reason: `${key} must be an absolute path to an existent directory`,
        received: value,
      },
    ];

  return [];
};

export const validateData = async (
  config: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  if (!isObject(config))
    return [
      {
        errorKind: 'type',
        key: 'data',
        reason: 'must be either undefined or an object',
        received: typeof config,
      },
    ];

  const errors: Array<ErrorDetails<APIConfig>> = [];

  if (!isObjKeyExist(config, 'doc') && !isObjKeyExist(config, 'pages'))
    errors.push({
      errorKind: 'reference',
      key: 'data',
      reason: 'must contain a doc and/or a pages key',
      received: Object.keys(config).join(', '),
    });
  else {
    const entries = Object.entries(config) as Array<
      [keyof APIDataConfig, unknown]
    >;
    const promises = entries.map(async ([key, value]) => {
      if (isUndefined(value)) return [];
      return validateDataKeyValue(key, value);
    });
    errors.push(...(await Promise.all(promises)).flat());
  }

  return errors;
};

export const validateEndpoint = (
  value: unknown
): Array<ErrorDetails<APIConfig>> => {
  if (!isString(value))
    return [
      {
        errorKind: 'type',
        key: 'endpoint',
        reason: 'must be a string',
        received: typeof value,
      },
    ];

  if (!value.startsWith('/'))
    return [
      {
        errorKind: 'type',
        key: 'endpoint',
        reason: 'should start with a slash (/)',
        received: typeof value,
      },
    ];

  return [];
};

export const validateGraphiQL = (
  value: unknown
): Array<ErrorDetails<APIConfig>> => {
  if (isBoolean(value)) return [];

  return [
    {
      errorKind: 'type',
      key: 'graphiql',
      reason: 'must be a boolean value',
      received: typeof value,
    },
  ];
};

export const validateConfigKeyValue = async (
  key: keyof PartialDeep<APIConfig>,
  value: unknown
): Promise<Array<ErrorDetails<APIConfig>>> => {
  switch (key) {
    case 'data':
      return validateData(value);
    case 'endpoint':
      return validateEndpoint(value);
    case 'graphiql':
      return validateGraphiQL(value);
    default:
      throw new CretadocAPIError('Invalid configuration key', {
        errorKind: 'syntax',
        reason: `Received an unknown config key.`,
        received: key,
      });
  }
};

export const validateConfig = async (config: PartialDeep<APIConfig>) => {
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
 * @param {Maybe<PartialDeep<APIConfig>>} config - The consumer config.
 * @returns {Promise<APIConfig>} The full configuration.
 */
export const mergeDefaultConfigWith = async (
  config: Maybe<PartialDeep<APIConfig>>
): Promise<APIConfig> => {
  if (!config) return DEFAULT_CONFIG;

  const errors = await validateConfig(config);

  if (errors.length)
    throw new CretadocAPIError('Invalid configuration', errors);

  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
};

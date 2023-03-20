import {
  deepFreeze,
  type Maybe,
  type PartialDeep,
  type ReadonlyDeep,
} from '@cretadoc/utils';
import type { ServerConfig } from '../types';
import { DEFAULT_HOSTNAME, DEFAULT_MODE, DEFAULT_PORT } from './constants';

/**
 * Retrieve the default config.
 *
 * @returns {ServerConfig} The default configuration.
 */
export const getDefaultConfig = (): ServerConfig => {
  return {
    hostname: DEFAULT_HOSTNAME,
    mode: DEFAULT_MODE,
    port: DEFAULT_PORT,
  };
};

/**
 * Merge the user config with default server configuration.
 *
 * @param {Maybe<PartialDeep<ServerConfig>>} userConfig - A config object.
 * @returns {ReadonlyDeep<ServerConfig>} The server configuration.
 */
export const mergeDefaultConfigWith = (
  userConfig: Maybe<PartialDeep<ServerConfig>>
): ReadonlyDeep<ServerConfig> => {
  const defaultConfig = getDefaultConfig();

  if (!userConfig) return deepFreeze(defaultConfig);

  const newConfig: ServerConfig = {
    hostname: userConfig.hostname ?? defaultConfig.hostname,
    mode: userConfig.mode ?? defaultConfig.mode,
    port: userConfig.port ?? defaultConfig.port,
  };

  return deepFreeze(newConfig);
};

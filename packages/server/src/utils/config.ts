import { existsSync } from 'fs';
import {
  deepFreeze,
  type Maybe,
  type PartialDeep,
  type ReadonlyDeep,
} from '@cretadoc/utils';
import type { APIConfig, ServerConfig, StaticDirConfig } from '../types';
import {
  DEFAULT_API_ROUTE,
  DEFAULT_HOSTNAME,
  DEFAULT_MODE,
  DEFAULT_PORT,
  DEFAULT_STATIC_DIR_ENTRYPOINT,
  DEFAULT_STATIC_DIR_ROUTE,
} from './constants';
import { invalid, missing } from './errors';

/**
 * Retrieve the default config.
 *
 * @returns {ServerConfig} The default configuration.
 */
export const getDefaultConfig = (): ServerConfig => {
  return {
    api: undefined,
    hostname: DEFAULT_HOSTNAME,
    mode: DEFAULT_MODE,
    port: DEFAULT_PORT,
    staticDir: undefined,
  };
};

/**
 * Merge the user API config with some default values if needed.
 *
 * @param {PartialDeep<APIConfig>} [userConfig] - The user config.
 * @returns {Maybe<APIConfig>} The merged config.
 */
export const mergeAPIConfig = (
  userConfig?: PartialDeep<APIConfig>
): Maybe<APIConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.instance) throw new Error(missing.config.api.instance);

  return {
    instance: userConfig.instance,
    route: userConfig.route ?? DEFAULT_API_ROUTE,
  };
};

/**
 * Merge the user static dir config with some default values if needed.
 *
 * @param {PartialDeep<StaticDirConfig>} [userConfig] - The user config.
 * @returns {Maybe<StaticDirConfig>} The merged config.
 */
export const mergeStaticDirConfig = (
  userConfig?: PartialDeep<StaticDirConfig>
): Maybe<StaticDirConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.path) throw new Error(missing.config.staticDir.path);

  if (!existsSync(userConfig.path))
    throw new Error(invalid.config.staticDir.path(userConfig.path));

  return {
    entrypoint: userConfig.entrypoint ?? DEFAULT_STATIC_DIR_ENTRYPOINT,
    path: userConfig.path,
    route: userConfig.route ?? DEFAULT_STATIC_DIR_ROUTE,
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
    api: mergeAPIConfig(userConfig.api),
    hostname: userConfig.hostname ?? defaultConfig.hostname,
    mode: userConfig.mode ?? defaultConfig.mode,
    port: userConfig.port ?? defaultConfig.port,
    staticDir: mergeStaticDirConfig(userConfig.staticDir),
  };

  return deepFreeze(newConfig);
};

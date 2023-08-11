import { existsSync } from 'fs';
import {
  deepFreeze,
  type Maybe,
  type PartialDeep,
  type ReadonlyDeep,
} from '@cretadoc/utils';
import type {
  HMRConfig,
  ServerConfig,
  ServerMode,
  SSRConfig,
  StaticDirConfig,
} from '../../types';
import {
  DEFAULT_CONFIG,
  DEFAULT_ENTRYPOINT_FILE,
  DEFAULT_SSR_ROUTE,
  DEFAULT_STATIC_ROUTE,
} from '../constants';
import { ConfigError } from '../exceptions';

/**
 * Merge the user static directory config with some default values if needed.
 *
 * @param {PartialDeep<StaticDirConfig>} [userConfig] - The user config.
 * @returns {Maybe<StaticDirConfig>} The merged config.
 */
export const mergeStaticDirConfig = (
  userConfig?: PartialDeep<StaticDirConfig>
): Maybe<StaticDirConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.path)
    throw new ConfigError('The static directory path is mandatory.');

  if (!existsSync(userConfig.path))
    throw new ConfigError(
      `The static directory path does not exist. Received: ${userConfig.path}`
    );

  return {
    entrypoint: userConfig.entrypoint ?? DEFAULT_ENTRYPOINT_FILE,
    path: userConfig.path,
    route: userConfig.route ?? DEFAULT_STATIC_ROUTE,
  };
};

/**
 * Merge the user HMR config with some default values if needed.
 *
 * @param {PartialDeep<HMRConfig>} [userConfig] - The user config.
 * @param {Maybe<ServerMode>} [mode] - The server mode.
 * @returns {Maybe<HMRConfig>} The merged config.
 */
export const mergeHMRConfig = (
  userConfig?: PartialDeep<HMRConfig>,
  mode?: Maybe<ServerMode>
): Maybe<HMRConfig> => {
  if (userConfig === false) return userConfig;
  if (userConfig) return { port: userConfig.port };

  return mode === 'production' ? false : undefined;
};

/**
 * Merge the user SSR config with some default values if needed.
 *
 * @param {PartialDeep<SSRConfig>} [userConfig] - The user config.
 * @returns {Maybe<SSRConfig>} The merged config.
 */
export const mergeSSRConfig = (
  userConfig?: PartialDeep<SSRConfig>
): Maybe<SSRConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.entrypoint)
    throw new ConfigError('In SSR mode, the server entrypoint is mandatory.');

  return {
    entrypoint: userConfig.entrypoint,
    route: userConfig.route ?? DEFAULT_SSR_ROUTE,
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
  const mode = userConfig?.mode ?? DEFAULT_CONFIG.mode;

  if (!userConfig) return deepFreeze(DEFAULT_CONFIG);

  const newConfig: ServerConfig = {
    api: userConfig.api,
    hmr: mergeHMRConfig(userConfig.hmr, mode),
    hostname: userConfig.hostname ?? DEFAULT_CONFIG.hostname,
    mode,
    port: userConfig.port ?? DEFAULT_CONFIG.port,
    ssr: mergeSSRConfig(userConfig.ssr),
    staticDir: mergeStaticDirConfig(userConfig.staticDir),
  };

  return deepFreeze(newConfig);
};

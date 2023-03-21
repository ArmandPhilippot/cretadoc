import { existsSync } from 'fs';
import {
  deepFreeze,
  type Maybe,
  type PartialDeep,
  type ReadonlyDeep,
} from '@cretadoc/utils';
import type {
  APIConfig,
  HMRConfig,
  ServerConfig,
  SSRConfig,
  StaticDirConfig,
} from '../types';
import {
  DEFAULT_API_ROUTE,
  DEFAULT_ENTRYPOINT_FILE,
  DEFAULT_HOSTNAME,
  DEFAULT_MODE,
  DEFAULT_PORT,
  DEFAULT_SSR_ROUTE,
  DEFAULT_STATIC_ROUTE,
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
    hmr: undefined,
    hostname: DEFAULT_HOSTNAME,
    mode: DEFAULT_MODE,
    port: DEFAULT_PORT,
    ssr: undefined,
    staticDir: undefined,
  };
};

/**
 * Merge the user API config with some default values if needed.
 *
 * @param {PartialDeep<APIConfig>} [userConfig] - The user config.
 * @returns {Maybe<APIConfig>} The merged config.
 */
const mergeAPIConfig = (
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
 * Merge the user static directory config with some default values if needed.
 *
 * @param {PartialDeep<StaticDirConfig>} [userConfig] - The user config.
 * @returns {Maybe<StaticDirConfig>} The merged config.
 */
const mergeStaticDirConfig = (
  userConfig?: PartialDeep<StaticDirConfig>
): Maybe<StaticDirConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.path) throw new Error(missing.config.staticDir.path);

  if (!existsSync(userConfig.path))
    throw new Error(invalid.config.staticDir.path(userConfig.path));

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
 * @returns {Maybe<HMRConfig>} The merged config.
 */
const mergeHMRConfig = (
  userConfig?: PartialDeep<HMRConfig>
): Maybe<HMRConfig> => {
  if (!userConfig) return undefined;

  return {
    port: userConfig.port,
  };
};

/**
 * Merge the user SSR config with some default values if needed.
 *
 * @param {PartialDeep<SSRConfig>} [userConfig] - The user config.
 * @returns {Maybe<SSRConfig>} The merged config.
 */
const mergeSSRConfig = (
  userConfig?: PartialDeep<SSRConfig>
): Maybe<SSRConfig> => {
  if (!userConfig) return undefined;

  if (!userConfig.entrypoint) throw new Error(missing.config.ssr.entrypoint);

  if (!userConfig.placeholders?.content)
    throw new Error(missing.config.ssr.placeholders);

  if (!userConfig.template) throw new Error(missing.config.ssr.template);

  return {
    entrypoint: userConfig.entrypoint,
    placeholders: {
      content: userConfig.placeholders.content,
    },
    route: userConfig.route ?? DEFAULT_SSR_ROUTE,
    template: userConfig.template,
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
    hmr: mergeHMRConfig(userConfig.hmr),
    hostname: userConfig.hostname ?? defaultConfig.hostname,
    mode: userConfig.mode ?? defaultConfig.mode,
    port: userConfig.port ?? defaultConfig.port,
    ssr: mergeSSRConfig(userConfig.ssr),
    staticDir: mergeStaticDirConfig(userConfig.staticDir),
  };

  return deepFreeze(newConfig);
};

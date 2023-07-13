import { extractKeysFromObj } from '@cretadoc/utils';
import type {
  ConfigShape,
  CretadocServerConfig,
  EnsureExactShape,
  ServerConfigShape,
} from '../../types';
import { DEFAULT_SERVER_CONFIG } from '../constants';
import { ConfigError, ConfigValidationError } from '../exceptions';
import { isConfigShapeValid } from '../shared/is-config-shape-valid';
import { loadConfigFile } from '../shared/load-config-file';
import { validateServerConfig } from './validate-server-config';

/**
 * Retrieve a full server configuration object from a partial one.
 *
 * @param {EnsureExactShape<ServerConfigShape, T>} config - A partial config.
 * @returns {CretadocServerConfig} The full configuration.
 */
const getServerConfig = <T extends ServerConfigShape>(
  config: EnsureExactShape<ServerConfigShape, T>
): CretadocServerConfig => {
  const errors = validateServerConfig(config);
  const isValid = !errors.length;

  if (!isValid) throw new ConfigValidationError(errors);

  return {
    ...DEFAULT_SERVER_CONFIG,
    ...config,
    paths: {
      ...DEFAULT_SERVER_CONFIG.paths,
      ...config.paths,
    },
  };
};

/**
 * Load the server configuration.
 *
 * @param {string} filename - The config filename.
 * @param {string} cwd - The current working directory.
 * @returns {Promise<CretadocServerConfig>} The server configuration.
 */
export const loadServerConfig = async (
  filename: string,
  cwd: string
): Promise<CretadocServerConfig> => {
  const config = await loadConfigFile(filename, cwd);
  const validServerConfigKeys: Array<keyof CretadocServerConfig> = ['paths'];

  if (!isConfigShapeValid<ConfigShape>(config))
    throw new ConfigError(
      `Found a ${filename} file but it does not export a valid configuration.`
    );

  return getServerConfig(extractKeysFromObj(config, validServerConfigKeys));
};

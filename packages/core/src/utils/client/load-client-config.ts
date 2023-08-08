import type { NonOptionalKeysOf } from '@cretadoc/api';
import { extractKeysFromObj } from '@cretadoc/utils';
import type {
  ClientConfigShape,
  ConfigShape,
  CretadocClientConfig,
  CretadocPages,
  EnsureExactShape,
} from '../../types';
import { DEFAULT_CLIENT_CONFIG } from '../constants';
import { ConfigError, ConfigValidationError } from '../exceptions';
import { isConfigShapeValid } from '../shared/is-config-shape-valid';
import { loadConfigFile } from '../shared/load-config-file';
import { sanitizePagesProp } from './sanitizers';
import { validateClientConfig } from './validate-client-config';

/**
 * Retrieve a full client configuration object from a partial one.
 *
 * @param {EnsureExactShape<ClientConfigShape, T>} config - A partial config.
 * @returns {CretadocClientConfig} The full configuration.
 */
const getClientConfig = <T extends ClientConfigShape>(
  config: EnsureExactShape<ClientConfigShape, T>
): CretadocClientConfig => {
  const errors = validateClientConfig(config);
  const isValid = !errors.length;

  if (!isValid) throw new ConfigValidationError(errors);

  return {
    ...DEFAULT_CLIENT_CONFIG,
    ...config,
    doc: {
      ...DEFAULT_CLIENT_CONFIG.doc,
      ...config.doc,
    },
    pages: sanitizePagesProp({
      ...DEFAULT_CLIENT_CONFIG.pages,
      ...(config.pages as Partial<CretadocPages>),
    }),
  };
};

/**
 * Load the client configuration.
 *
 * @param {string} filename - The config filename.
 * @param {string} cwd - The current working directory.
 * @returns {Promise<CretadocClientConfig>} The client configuration.
 */
export const loadClientConfig = async (
  filename: string,
  cwd: string
): Promise<CretadocClientConfig> => {
  const config = await loadConfigFile(filename, cwd);
  const validClientConfigKeys: Array<NonOptionalKeysOf<CretadocClientConfig>> =
    ['copyright', 'doc', 'hideGenerator', 'locale', 'name', 'pages', 'theme'];

  if (!isConfigShapeValid<ConfigShape>(config))
    throw new ConfigError(
      `Found a ${filename} file but it does not export a valid configuration.`
    );

  return getClientConfig(extractKeysFromObj(config, validClientConfigKeys));
};

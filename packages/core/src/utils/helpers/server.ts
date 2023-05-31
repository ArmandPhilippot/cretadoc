import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { findUp } from 'find-up';
import type { CretadocConfig } from '../../types/config';
import { CONFIG_FILE_NAME, ERROR } from '../constants';
import { ConfigError } from '../exceptions';
import { validateConfig } from './config';

/**
 * Load the Cretadoc configuration.
 *
 * @returns {Promise<CretadocConfig>} The configuration.
 */
export const loadConfig = async (): Promise<CretadocConfig> => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const configPath = await findUp(CONFIG_FILE_NAME, { cwd: currentDir });

  if (!configPath) throw new ConfigError(ERROR.MISSING.CONFIG);

  const config = (await import(/* @vite-ignore */ configPath)) as {
    default: unknown;
  };

  return validateConfig(config.default);
};

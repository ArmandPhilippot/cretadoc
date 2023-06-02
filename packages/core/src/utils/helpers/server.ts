import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { findUp } from 'find-up';
import type { CretadocConfig } from '../../types/config';
import { CONFIG_FILE_NAME } from '../constants';
import { ConfigError } from '../exceptions';
import { getFullConfigFrom } from './config';

/**
 * Load the Cretadoc configuration.
 *
 * @returns {Promise<CretadocConfig>} The configuration.
 */
export const loadConfig = async (): Promise<CretadocConfig> => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const configPath = await findUp(CONFIG_FILE_NAME, { cwd: currentDir });

  if (!configPath)
    throw new ConfigError(
      `Cannot find ${CONFIG_FILE_NAME} file. A configuration file is required for Cretadoc to work properly.`
    );

  const { default: exportedConfig } = (await import(
    /* @vite-ignore */ configPath
  )) as {
    default: unknown;
  };

  return getFullConfigFrom(exportedConfig);
};

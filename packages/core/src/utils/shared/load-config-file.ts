import { findUp } from 'find-up';
import { ConfigError } from '../exceptions';

/**
 * Load the given configuration file.
 *
 * @param {string} filename - The filename to search and load.
 * @param {string} cwd - The current working directory.
 * @returns {Promise<unknown>} The exported configuration.
 */
export const loadConfigFile = async (
  filename: string,
  cwd: string
): Promise<unknown> => {
  const configPath = await findUp(filename, { cwd });

  if (!configPath)
    throw new ConfigError(
      `Cannot find ${filename} file. A configuration file is required for Cretadoc to work properly.`
    );

  const config = (await import(/* @vite-ignore */ configPath)) as {
    default: unknown;
  };

  return config.default;
};

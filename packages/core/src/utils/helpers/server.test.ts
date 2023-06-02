import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import { CONFIG_FILE_NAME } from '../constants';
import { ConfigError } from '../exceptions';
import { loadConfig } from './server';

describe('load-config', () => {
  it('can load the config file', async () => {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const configFilePath = join(currentDir, CONFIG_FILE_NAME);
    const brandName = 'dolorum';
    const locale = 'en';
    await createConfigFile(configFilePath, 'custom', {
      locale,
      name: brandName,
    });
    const config = await loadConfig();
    expect(config.name).toBe(brandName);
    expect(config.locale).toBe(locale);
    await removeConfigFile(configFilePath);
    expect.assertions(2);
  });

  it('throws an error if the config file does not exist', async () => {
    await expect(async () => loadConfig()).rejects.toThrow(
      new ConfigError(
        `Cannot find ${CONFIG_FILE_NAME} file. A configuration file is required for Cretadoc to work properly.`
      )
    );
    expect.assertions(1);
  });
});

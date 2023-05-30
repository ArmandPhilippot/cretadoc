import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import { CONFIG_FILE_NAME, ERROR } from '../constants';
import { ConfigError } from '../exceptions';
import { loadConfig, validateConfig } from './config';

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
      new ConfigError(ERROR.MISSING.CONFIG)
    );
    expect.assertions(1);
  });
});

describe('validate-config', () => {
  it('throws an error when the config is not an exported object', () => {
    expect(() => validateConfig('')).toThrow(
      new ConfigError(ERROR.EMPTY.CONFIG)
    );
    expect.assertions(1);
  });

  it('throws an error when the name key has an invalid type', () => {
    const brandName = 42;
    expect(() => validateConfig({ name: brandName })).toThrowError(
      new RegExp(ERROR.INVALID.TYPE('string', typeof brandName))
    );
    expect.assertions(1);
  });
});

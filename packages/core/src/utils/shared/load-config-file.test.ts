import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { FIXTURES_DIR_PATH } from '../../../tests/utils/constants';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import { CONFIG_FILE_NAME } from '../constants';
import { ConfigError } from '../exceptions';
import { loadConfigFile } from './load-config-file';

describe('load-config-file', () => {
  it('can load the config file', async () => {
    const configFilePath = join(FIXTURES_DIR_PATH, CONFIG_FILE_NAME);
    await createConfigFile(configFilePath, 'custom', {});
    const config = await loadConfigFile(CONFIG_FILE_NAME, FIXTURES_DIR_PATH);
    expect(config).toBeDefined();
    await removeConfigFile(configFilePath);
    expect.assertions(1);
  });

  it('throws an error if the config file does not exist', async () => {
    await expect(async () =>
      loadConfigFile(CONFIG_FILE_NAME, FIXTURES_DIR_PATH)
    ).rejects.toThrow(
      new ConfigError(
        `Cannot find ${CONFIG_FILE_NAME} file. A configuration file is required for Cretadoc to work properly.`
      )
    );
    expect.assertions(1);
  });
});

import { join } from 'path';
import type { ReplaceTypesIn } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import { FIXTURES_DIR_PATH } from '../../../tests/utils/constants';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import type { CretadocServerConfig } from '../../types';
import { ConfigError } from '../exceptions';
import { loadServerConfig } from './load-server-config';

describe('load-server-config', () => {
  it('can return the server configuration', async () => {
    const filename = 'load-server-config.test1.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);
    const pages = null;

    await createConfigFile(configFilePath, 'custom', {
      paths: {
        pages,
      },
    });

    const config = await loadServerConfig(filename, FIXTURES_DIR_PATH);
    expect(config.paths.pages).toBe(pages);

    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });

  it('throws an error if the config file does not exist', async () => {
    const filename = 'load-server-config.test2.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    await createConfigFile(configFilePath, 'custom', {});
    await expect(async () =>
      loadServerConfig(filename, FIXTURES_DIR_PATH)
    ).rejects.toThrow(
      new ConfigError(
        `Found a ${filename} file but it does not export a valid configuration.`
      )
    );
    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });

  it('throws an error if the configuration is invalid', async () => {
    const config: Partial<ReplaceTypesIn<CretadocServerConfig, number>> = {
      paths: {
        pages: 42,
      },
    };
    const filename = 'load-server-config.test3.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    // @ts-expect-error -- The configuration is invalid.
    await createConfigFile(configFilePath, 'custom', config);
    await expect(async () =>
      loadServerConfig(filename, FIXTURES_DIR_PATH)
    ).rejects.toThrowError();
    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });
});

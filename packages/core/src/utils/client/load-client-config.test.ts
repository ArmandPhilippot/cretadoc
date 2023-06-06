import { join } from 'path';
import type { ReplaceTypesIn } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import { FIXTURES_DIR_PATH } from '../../../tests/utils/constants';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import type { CretadocClientConfig } from '../../types';
import { ConfigError } from '../exceptions';
import { loadClientConfig } from './load-client-config';

describe('load-client-config', () => {
  it('can return the client configuration', async () => {
    const filename = 'load-client-config.test1.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);
    const locale = 'en';

    await createConfigFile(configFilePath, 'custom', {
      locale,
    });

    const config = await loadClientConfig(filename, FIXTURES_DIR_PATH);
    expect(config.locale).toBe(locale);

    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });

  it('throws an error if the config file does not exist', async () => {
    const filename = 'load-client-config.test2.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    await createConfigFile(configFilePath, 'custom', {});
    await expect(async () =>
      loadClientConfig(filename, FIXTURES_DIR_PATH)
    ).rejects.toThrow(
      new ConfigError(
        `Found a ${filename} file but it does not export a valid configuration.`
      )
    );
    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });

  it('throws an error if the configuration is invalid', async () => {
    const config: Partial<ReplaceTypesIn<CretadocClientConfig, number>> = {
      copyright: 42,
    };
    const filename = 'load-client-config.test3.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    // @ts-expect-error -- The configuration is invalid.
    await createConfigFile(configFilePath, 'custom', config);
    await expect(async () =>
      loadClientConfig(filename, FIXTURES_DIR_PATH)
    ).rejects.toThrowError();
    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });
});

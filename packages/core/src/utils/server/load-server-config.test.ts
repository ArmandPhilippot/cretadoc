// @vitest-environment node
import { join } from 'node:path';
import type { ReplaceTypesIn } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import { FIXTURES_DIR_PATH } from '../../../tests/utils/constants';
import {
  createConfigFile,
  removeConfigFile,
} from '../../../tests/utils/helpers';
import type { CretadocServerConfig } from '../../types';
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

  it('throws an error when the config file is empty', async () => {
    const filename = 'load-server-config.test2.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    await createConfigFile(configFilePath, 'custom', {});

    await expect(async () =>
      loadServerConfig(filename, FIXTURES_DIR_PATH)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"BAD_CONFIGURATION: Found a load-server-config.test2.fixture.js file but it does not export a valid configuration."'
    );

    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });

  it('throws an error if the configuration is invalid', async () => {
    const config: Partial<ReplaceTypesIn<CretadocServerConfig, number>> = {
      paths: {
        doc: 24,
        pages: 42,
      },
    };
    const filename = 'load-server-config.test3.fixture.js';
    const configFilePath = join(FIXTURES_DIR_PATH, filename);

    // @ts-expect-error -- The configuration is invalid.
    await createConfigFile(configFilePath, 'custom', config);

    await expect(async () => loadServerConfig(filename, FIXTURES_DIR_PATH))
      .rejects.toThrowErrorMatchingInlineSnapshot(`
      "BAD_CONFIGURATION: 
      - paths: string or null expected in doc property. Received: number
      - paths: string or null expected in pages property. Received: number"
    `);

    await removeConfigFile(configFilePath);

    expect.assertions(1);
  });
});

import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { DOC_FIXTURES_DIR } from '../../../tests/utils/constants';
import type { APIConfig } from '../../types';
import { DEFAULT_CONFIG } from '../constants';
import { mergeConfig } from './config';

/* eslint-disable max-statements */
describe('config', () => {
  it('returns the default config if the given one is undefined', async () => {
    const mergedConfig = await mergeConfig(undefined);
    expect(mergedConfig).toStrictEqual(DEFAULT_CONFIG);
  });

  it('can merge the given config with the default config', async () => {
    const config: Partial<APIConfig> = {
      endpoint: '/provident',
      graphiql: false,
    };
    const mergedConfig = await mergeConfig(config);

    expect(mergedConfig.endpoint).toBe(config.endpoint);
    expect(mergedConfig.data).toBe(DEFAULT_CONFIG.data);
    expect(mergedConfig.graphiql).toBe(config.graphiql);
  });

  it('throws an error if the config contains invalid keys', async () => {
    const config = {
      endpoint: '/api',
      foo: 'bar',
    };

    await expect(async () =>
      mergeConfig(config)
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration key"');
    expect.assertions(1);
  });

  it('throws an error if the data config has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeConfig({ data: 42 })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if the endpoint has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeConfig({ endpoint: 42 })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if the endpoint has an invalid value', async () => {
    await expect(async () =>
      mergeConfig({ endpoint: 'dolor' })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if the graphiql option has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeConfig({ graphiql: 42 })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeConfig({ data: { pages: 42 } })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if a key in data config has a missing key', async () => {
    await expect(async () =>
      mergeConfig({
        data: {
          // @ts-expect-error - Missing baseUrl key
          doc: {
            path: DOC_FIXTURES_DIR,
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid baseUrl', async () => {
    await expect(async () =>
      mergeConfig({
        data: {
          doc: {
            // @ts-expect-error - Invalid type
            baseUrl: 42,
            path: DOC_FIXTURES_DIR,
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid path type', async () => {
    await expect(async () =>
      mergeConfig({
        data: {
          pages: {
            baseUrl: '/any',
            // @ts-expect-error - Invalid type
            path: 42,
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid path', async () => {
    await expect(async () =>
      mergeConfig({
        data: {
          pages: {
            baseUrl: '/any',
            path: 'libero',
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"ENOENT: no such file or directory, stat \'libero\'"'
    );
    expect.assertions(1);
  });

  it('throws an error if a key in data config has a file as path', async () => {
    await expect(async () =>
      mergeConfig({
        data: {
          doc: {
            baseUrl: '/any',
            path: fileURLToPath(new URL('../constants.ts', import.meta.url)),
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });

  it('throws an error if the data config has no doc/pages keys', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeConfig({ data: { foo: 'bar' } })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid configuration"');
    expect.assertions(1);
  });
});
/* eslint-enable max-statements */

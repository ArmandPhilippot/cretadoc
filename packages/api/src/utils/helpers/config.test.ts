import { describe, expect, it } from 'vitest';
import type { APIConfig } from '../../types';
import { DEFAULT_CONFIG } from '../constants';
import { mergeDefaultConfigWith } from './config';

/* eslint-disable max-statements */
describe('config', () => {
  it('returns the default config if the given one is undefined', async () => {
    const mergedConfig = await mergeDefaultConfigWith(undefined);
    expect(mergedConfig).toStrictEqual(DEFAULT_CONFIG);
  });

  it('can merge the given config with the default config', async () => {
    const config: Partial<APIConfig> = {
      endpoint: '/provident',
      graphiql: false,
    };
    const mergedConfig = await mergeDefaultConfigWith(config);

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
      mergeDefaultConfigWith(config)
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the data config has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeDefaultConfigWith({ data: 42 })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the endpoint has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeDefaultConfigWith({ endpoint: 42 })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the endpoint has an invalid value', async () => {
    await expect(async () =>
      mergeDefaultConfigWith({ endpoint: 'dolor' })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the graphiql option has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeDefaultConfigWith({ graphiql: 42 })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid type', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeDefaultConfigWith({ data: { pages: 42 } })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if a key in data config has an invalid value', async () => {
    await expect(async () =>
      mergeDefaultConfigWith({ data: { pages: 'libero' } })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if a key in data config is a file', async () => {
    await expect(async () =>
      mergeDefaultConfigWith({
        data: { doc: new URL('../constants.ts', import.meta.url).pathname },
      })
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the data config has no doc/pages keys', async () => {
    await expect(async () =>
      // @ts-expect-error - Invalid config
      mergeDefaultConfigWith({ data: { foo: 'bar' } })
    ).rejects.toThrowError();
    expect.assertions(1);
  });
});
/* eslint-enable max-statements */

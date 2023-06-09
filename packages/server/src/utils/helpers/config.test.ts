import { createAPI } from '@cretadoc/api';
import { deepFreeze } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import type { HMRConfig } from '../../types';
import {
  DEFAULT_API_ROUTE,
  DEFAULT_CONFIG,
  DEFAULT_ENTRYPOINT_FILE,
  DEFAULT_SSR_ROUTE,
  DEFAULT_STATIC_ROUTE,
} from '../constants';
import { ConfigError } from '../exceptions';
import {
  mergeAPIConfig,
  mergeDefaultConfigWith,
  mergeHMRConfig,
  mergeSSRConfig,
  mergeStaticDirConfig,
} from './config';

describe('merge-api-config', () => {
  it('returns an undefined config if an user config is not provided', () => {
    expect(mergeAPIConfig()).toStrictEqual(undefined);
  });

  it('throws an error if an user config is provided without an instance', () => {
    expect(() => mergeAPIConfig({ route: '/any-path' })).toThrow(
      new ConfigError('An API instance is mandatory.')
    );
  });

  it('can merge the given config with the default config', () => {
    const instance = createAPI();
    expect(mergeAPIConfig({ instance })).toEqual({
      instance,
      route: DEFAULT_API_ROUTE,
    });
  });

  it('returns the given config when complete', () => {
    const instance = createAPI();
    const route = '/api-endpoint';
    expect(mergeAPIConfig({ instance, route })).toEqual({
      instance,
      route,
    });
  });
});

describe('merge-static-dir-config', () => {
  it('returns an undefined config if an user config is not provided', () => {
    expect(mergeStaticDirConfig()).toBe(undefined);
  });

  it('throws an error if an user config is provided without a path', () => {
    expect(() => mergeStaticDirConfig({ route: '/any-path' })).toThrow(
      new ConfigError('The static directory path is mandatory.')
    );
  });

  it('throws an error if the given path does not exist', () => {
    const path = './non-existent-path';
    expect(() => mergeStaticDirConfig({ path })).toThrow(
      new ConfigError(
        `The static directory path does not exist. Received: ${path}`
      )
    );
  });

  it('can merge the given config with the default config', () => {
    const path = new URL('../../../tests/fixtures/static-dir', import.meta.url)
      .pathname;
    expect(mergeStaticDirConfig({ path })).toStrictEqual({
      entrypoint: DEFAULT_ENTRYPOINT_FILE,
      path,
      route: DEFAULT_STATIC_ROUTE,
    });
  });

  it('returns the given config when complete', () => {
    const entrypoint = 'index.html';
    const path = new URL('../../../tests/fixtures/static-dir', import.meta.url)
      .pathname;
    const route = '/static-endpoint';
    expect(mergeStaticDirConfig({ entrypoint, path, route })).toStrictEqual({
      entrypoint,
      path,
      route,
    });
  });
});

describe('merge-hmr-config', () => {
  it('returns the user config if provided', () => {
    const userConfig: HMRConfig = false;
    expect(mergeHMRConfig(userConfig)).toBe(userConfig);
  });

  it('returns false in production mode if the user config is not provided', () => {
    expect(mergeHMRConfig(undefined, 'production')).toBe(false);
  });

  it('returns an undefined config in dev mode if the user config is not provided', () => {
    expect(mergeHMRConfig(undefined, 'development')).toBe(undefined);
  });
});

describe('merge-ssr-config', () => {
  it('returns an undefined config if an user config is not provided', () => {
    expect(mergeSSRConfig()).toBe(undefined);
  });

  it('throws an error if an user config is provided without an entrypoint', () => {
    expect(() => mergeSSRConfig({ route: '/any-path' })).toThrow(
      new ConfigError('In SSR mode, the server entrypoint is mandatory.')
    );
  });

  it('throws an error if the content placeholder is not provided', () => {
    expect(() => mergeSSRConfig({ entrypoint: '/any-path' })).toThrow(
      new ConfigError('In SSR mode, the content placeholder is mandatory.')
    );
  });

  it('throws an error if the template path is not provided', () => {
    expect(() =>
      mergeSSRConfig({
        entrypoint: '/any-path',
        placeholders: { content: 'any-placeholder' },
      })
    ).toThrow(new ConfigError('In SSR mode, the template is mandatory.'));
  });

  it('can merge the given config with the default config', () => {
    const entrypoint = new URL(
      '../../../tests/fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL(
      '../../../tests/fixtures/ssr/index.html',
      import.meta.url
    ).pathname;
    const contentPlaceholder = 'any-placeholder';
    expect(
      mergeSSRConfig({
        entrypoint,
        placeholders: { content: contentPlaceholder },
        template,
      })
    ).toStrictEqual({
      entrypoint,
      placeholders: {
        content: contentPlaceholder,
        initialState: undefined,
        preloadedLinks: undefined,
      },
      route: DEFAULT_SSR_ROUTE,
      template,
    });
  });

  it('returns the given config when complete', () => {
    const entrypoint = 'index.html';
    const path = new URL('../../../tests/fixtures/static-dir', import.meta.url)
      .pathname;
    const route = '/static-endpoint';
    expect(mergeStaticDirConfig({ entrypoint, path, route })).toStrictEqual({
      entrypoint,
      path,
      route,
    });
  });
});

describe('merge-default-config-with', () => {
  it('returns the default config if an user config is not provided', () => {
    expect(mergeDefaultConfigWith(undefined)).toStrictEqual(
      deepFreeze(DEFAULT_CONFIG)
    );
  });

  it('can merge the given config with the default config', () => {
    expect(mergeDefaultConfigWith({ hostname: 'local' })).toStrictEqual(
      deepFreeze({ ...DEFAULT_CONFIG, hostname: 'local' })
    );
  });
});

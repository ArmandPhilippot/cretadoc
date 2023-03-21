import { describe, it } from 'vitest';
import { createServer } from '../src';
import { DEFAULT_STATIC_ROUTE } from '../src/utils/constants';
import { invalid, missing } from '../src/utils/errors';
import { expect } from './utils';

describe('static-dir', () => {
  it('serves the directory contents with default entrypoint', async () => {
    const path = new URL('./fixtures/static-dir/', import.meta.url).pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4200,
      staticDir: { path },
    });

    await expect({ server, endpoint: DEFAULT_STATIC_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'Hello from Cretadoc default entrypoint!',
    });
    expect.assertions(1);
  });

  it('serves the directory contents with a custom entrypoint', async () => {
    const path = new URL('./fixtures/static-dir/', import.meta.url).pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4200,
      staticDir: { entrypoint: 'custom.html', path },
    });

    await expect({ server, endpoint: DEFAULT_STATIC_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'Hello from Cretadoc custom entrypoint!',
    });
    expect.assertions(1);
  });

  it('accepts an absolute path as entrypoint', async () => {
    const path = new URL('./fixtures/static-dir/', import.meta.url).pathname;
    const entrypoint = new URL(
      './fixtures/static-dir/custom.html',
      import.meta.url
    ).pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4200,
      staticDir: { entrypoint, path },
    });

    await expect({ server, endpoint: DEFAULT_STATIC_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'Hello from Cretadoc custom entrypoint!',
    });
    expect.assertions(1);
  });

  it('serves the directory contents at a custom route', async () => {
    const path = new URL('./fixtures/static-dir/', import.meta.url).pathname;
    const route = '/custom';
    const server = await createServer({
      hostname: 'localhost',
      port: 4200,
      staticDir: { path, route },
    });

    await expect({ server, endpoint: route }).toRespondWith({
      statusCode: 200,
      text: 'Hello from Cretadoc default entrypoint!',
    });
    expect.assertions(1);
  });

  it('throws an error if the path is not provided', async () => {
    await expect(async () =>
      createServer({ staticDir: { entrypoint: 'any.html' } })
    ).rejects.toThrowError(missing.config.staticDir.path);
    expect.assertions(1);
  });

  it('throws an error if the path does not exist', async () => {
    const nonExistentPath = '/any-non-existent-path';
    await expect(async () =>
      createServer({ staticDir: { path: nonExistentPath } })
    ).rejects.toThrowError(invalid.config.staticDir.path(nonExistentPath));
    expect.assertions(1);
  });
});

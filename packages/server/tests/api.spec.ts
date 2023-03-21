import { createAPI } from '@cretadoc/api';
import { describe, it } from 'vitest';
import { createServer } from '../src';
import { DEFAULT_API_ROUTE } from '../src/utils/constants';
import { missing } from '../src/utils/errors';
import { expect } from './utils';

describe('api', () => {
  it('serves the api with default route', async () => {
    const api = createAPI({ endpoint: DEFAULT_API_ROUTE });
    const server = createServer({
      api: {
        instance: api,
      },
      hostname: 'localhost',
      port: 4200,
    });

    await expect({ server, endpoint: DEFAULT_API_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'errors',
    });
    expect.assertions(1);
  });

  it('serves the api with a custom route', async () => {
    const endpoint = '/custom';
    const api = createAPI({ endpoint });
    const server = createServer({
      api: {
        instance: api,
        route: endpoint,
      },
      hostname: 'localhost',
      port: 4200,
    });

    await expect({ server, endpoint }).toRespondWith({
      statusCode: 200,
      text: 'errors',
    });
    expect.assertions(1);
  });

  it('throws an error if the API instance is not provided', () => {
    expect(() => createServer({ api: { route: '/anyRoute' } })).toThrowError(
      missing.config.api.instance
    );
  });
});

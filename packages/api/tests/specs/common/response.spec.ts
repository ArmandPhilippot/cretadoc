/* eslint-disable @typescript-eslint/no-magic-numbers */
import request from 'supertest';
import { describe, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../../src/utils/constants';
import { expect } from '../../utils';
import { createAPIServer } from '../../utils/helpers';

describe('response', () => {
  it('returns a successful response when using the default endpoint', async () => {
    const api = await createAPIServer({});
    api.start();

    const response = await request(api.instance)
      .post(DEFAULT_CONFIG.endpoint)
      .send({ query: '' });

    const text = 'errors'; // We are not passing a query.

    expect(response).toRespondWith({ statusCode: 200, text });
    expect.assertions(1);
    api.stop();
  });

  it('returns a successful response when using a custom endpoint', async () => {
    const customEndpoint = '/api';

    if (customEndpoint === (DEFAULT_CONFIG.endpoint as string))
      throw new Error(
        'The test should be updated: the custom endpoint is the same as the default one.'
      );

    const api = await createAPIServer({ endpoint: customEndpoint });
    api.start();

    const response = await request(api.instance)
      .post(customEndpoint)
      .send({ query: '' });

    const text = 'errors'; // Without query we should have errors.

    expect(response).toRespondWith({ statusCode: 200, text });
    expect.assertions(1);
    api.stop();
  });

  it('returns a 404 response when using a wrong endpoint', async () => {
    const customEndpoint = '/api';

    if (customEndpoint === (DEFAULT_CONFIG.endpoint as string))
      throw new Error(
        'The test should be updated: the custom endpoint is the same as the default one.'
      );

    const api = await createAPIServer({});
    api.start();

    const response = await request(api.instance)
      .post(customEndpoint)
      .send({ query: '' });

    const text = ''; // Should be empty.

    expect(response).toRespondWith({ statusCode: 404, text });
    expect.assertions(1);
    api.stop();
  });
});

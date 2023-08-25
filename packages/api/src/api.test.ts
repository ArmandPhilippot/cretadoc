import { describe, expectTypeOf, it } from 'vitest';
import { DOC_FIXTURES_DIR, PAGES_FIXTURES_DIR } from '../tests/utils/constants';
import { createAPI } from './api';
import type { APIInstance } from './types';

describe('create-api', () => {
  it('can create a new API instance without config', async () => {
    const api = await createAPI();

    expectTypeOf(api).toMatchTypeOf<APIInstance>();
  });

  it('can create a new API instance with config', async () => {
    const api = await createAPI({
      data: {
        doc: { baseUrl: '/doc', path: DOC_FIXTURES_DIR },
        pages: { baseUrl: '/pages', path: PAGES_FIXTURES_DIR },
      },
      endpoint: '/api',
    });

    expectTypeOf(api).toMatchTypeOf<APIInstance>();
  });
});

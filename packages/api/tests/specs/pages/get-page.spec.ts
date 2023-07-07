import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import type { Page } from '../../../src';
import { pagesFixtures, rootPages } from '../../fixtures/pages';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../utils/helpers';
import { getPageQuery } from './queries';

type GetPageContext = {
  requestedPage: Maybe<Partial<Page>>;
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('get-page', () => {
  beforeEach<GetPageContext>(async (context) => {
    context.requestedPage = rootPages[0];
    context.server = await createAPIServer({
      data: { pages: PAGES_FIXTURES_DIR },
    });
  });

  beforeAll(async () => {
    await createFixtures(pagesFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it<GetPageContext>('can return a page by id', async ({
    requestedPage,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: { id: requestedPage?.id },
    });

    if (requestedPage) expect(response.data.page).toBePage(requestedPage);

    expect.assertions(1);
  });

  it<GetPageContext>('can return a page by name', async ({
    requestedPage,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: { name: requestedPage?.name },
    });

    if (requestedPage) expect(response.data.page).toBePage(requestedPage);

    expect.assertions(1);
  });

  it<GetPageContext>('can return a page by slug', async ({
    requestedPage,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: { slug: requestedPage?.slug },
    });

    if (requestedPage) expect(response.data.page).toBePage(requestedPage);

    expect.assertions(1);
  });

  it<GetPageContext>('returns errors when an argument is not provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: {},
    });

    expect(response.data.page).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id, a name or a slug.",
            },
          },
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "An argument is required",
          "path": [
            "page",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it<GetPageContext>('returns errors when too many arguments are provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: { name: 'foo', slug: '/bar' },
    });

    expect(response.data.page).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id, a name or a slug.",
            },
          },
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "Too many arguments",
          "path": [
            "page",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it('returns an unexpected error when pages dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getPageQuery,
      variables: { name: 'anyPage' },
    });

    expect(response.data.page).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "Unexpected error.",
          "path": [
            "page",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

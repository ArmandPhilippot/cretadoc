import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import { DEFAULT_EDGES_NUMBER } from '../../../src/utils/constants';
import { generateCursor } from '../../../src/utils/helpers';
import { pagesFixtures, rootPages } from '../../fixtures/pages';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../utils/helpers';
import { getPagesListQuery } from './queries';

type GetPagesListContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('get-pages-list', () => {
  beforeEach<GetPagesListContext>(async (context) => {
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

  it<GetPagesListContext>('returns the paginated pages', async ({ server }) => {
    const response = await server.sendQuery({ query: getPagesListQuery });

    expect(response.data.pages?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );
    expect(response.data.pages?.pageInfo).toBePageInfo({
      endCursor: response.data.pages?.edges.length
        ? generateCursor(response.data.pages.edges.length)
        : null,
      hasNextPage: rootPages.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootPages.length,
    });

    expect.assertions(2);
  });

  it<GetPagesListContext>('can return the desired number of pages per page', async ({
    server,
  }) => {
    const perPage = 1;
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: { first: perPage },
    });

    expect(response.data.pages?.edges.length).toBe(perPage);
    expect(response.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(perPage),
      hasNextPage: rootPages.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootPages.length,
    });

    expect.assertions(2);
  });

  it<GetPagesListContext>('can return the pages filtered by name', async ({
    server,
  }) => {
    const requestedName = 'in';
    const requestedFixtures = rootPages.filter((page) =>
      page.name.includes(requestedName)
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: {
        where: { name: requestedName },
      },
    });

    expect(response.data.pages?.edges.length).toBe(requestedFixturesCount);
    expect(response.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetPagesListContext>('can return the pages ordered by name', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'name' },
      },
    });
    const receivedNames = response.data.pages?.edges.map(
      (edge) => edge.node.name
    );
    const reversedRootPagesNames = rootPages
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootPagesNames);

    expect.assertions(2);
  });

  it<GetPagesListContext>('can return the pages ordered by slug', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'slug' },
      },
    });
    const receivedSlugs = response.data.pages?.edges.map(
      (edge) => edge.node.slug
    );
    const reversedRootPagesSlugs = rootPages
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootPagesSlugs);

    expect.assertions(2);
  });

  it<GetPagesListContext>('can return the pages ordered by creation date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'createdAt' },
      },
    });

    expect(response.data.pages?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetPagesListContext>('can return the pages ordered by last modification date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getPagesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'updatedAt' },
      },
    });

    expect(response.data.pages?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetPagesListContext>('does not return pages if directory is empty', async ({
    server,
  }) => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
    const response = await server.sendQuery({
      query: getPagesListQuery,
    });

    expect(response.data.pages?.edges.length).toBe(0);
    expect(response.data.pages?.pageInfo).toBePageInfo({
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      total: 0,
    });

    await createFixtures(pagesFixtures);

    expect.assertions(2);
  });

  it('returns an unexpected error when pages dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getPagesListQuery,
    });

    expect(response.data.pages).toBeNull();
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
            "pages",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import { DEFAULT_EDGES_NUMBER } from '../../../../src/utils/constants';
import { generateCursor } from '../../../../src/utils/helpers';
import {
  docDirectories,
  docFixtures,
  rootDocDirectories,
} from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocDirectoriesListQuery } from './queries';

type GetDocDirectoriesListContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('get-doc-directories-list', () => {
  beforeEach<GetDocDirectoriesListContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  beforeAll(async () => {
    await createFixtures(docFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<GetDocDirectoriesListContext>('returns the paginated doc directories', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
    });

    expect(response.data.doc?.directories?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );
    expect(response.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: response.data.doc?.directories?.edges.length
        ? generateCursor(response.data.doc.directories.edges.length)
        : null,
      hasNextPage: rootDocDirectories.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocDirectories.length,
    });

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the desired number of doc directories per page', async ({
    server,
  }) => {
    const perPage = 1;
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: { first: perPage },
    });

    expect(response.data.doc?.directories?.edges.length).toBe(perPage);
    expect(response.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(perPage),
      hasNextPage: rootDocDirectories.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocDirectories.length,
    });

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories filtered by name', async ({
    server,
  }) => {
    const requestedName = 'a';
    const requestedFixtures = docDirectories.filter((dir) =>
      dir.name.includes(requestedName)
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        where: { name: requestedName },
      },
    });

    expect(response.data.doc?.directories?.edges.length).toBe(
      requestedFixturesCount
    );
    expect(response.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories filtered by parent slug', async ({
    server,
  }) => {
    // An existing directory slug.
    const requestedSlug = '/excepturi';
    const requestedFixtures = docDirectories.filter(
      (dir) => dir.parent?.slug === requestedSlug
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        where: { slug: requestedSlug },
      },
    });

    expect(response.data.doc?.directories?.edges.length).toBe(
      requestedFixturesCount
    );
    expect(response.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories ordered by name', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'name' },
      },
    });
    const receivedNames = response.data.doc?.directories?.edges.map(
      (edge) => edge.node.name
    );
    const reversedRootDocDirectoriesNames = rootDocDirectories
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocDirectoriesNames);

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories ordered by slug', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'slug' },
      },
    });
    const receivedSlugs = response.data.doc?.directories?.edges.map(
      (edge) => edge.node.slug
    );
    const reversedRootDocDirectoriesSlugs = rootDocDirectories
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((file) => file.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootDocDirectoriesSlugs);

    expect.assertions(2);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories ordered by creation date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'createdAt' },
      },
    });

    expect(response.data.doc?.directories?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocDirectoriesListContext>('can return the doc directories ordered by last modification date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'updatedAt' },
      },
    });

    expect(response.data.doc?.directories?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocDirectoriesListContext>('does not return doc directories if directory is empty', async ({
    server,
  }) => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
    });

    expect(response.data.doc?.directories?.edges.length).toBe(0);
    expect(response.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      total: 0,
    });

    await createFixtures(docFixtures);

    expect.assertions(2);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getDocDirectoriesListQuery,
    });

    expect(response.data.doc?.directories).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "locations": [
            {
              "column": 5,
              "line": 3,
            },
          ],
          "message": "Unexpected error.",
          "path": [
            "doc",
            "directories",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

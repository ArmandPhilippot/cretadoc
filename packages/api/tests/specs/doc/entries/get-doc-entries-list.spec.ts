import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import { DEFAULT_EDGES_NUMBER } from '../../../../src/utils/constants';
import { generateCursor } from '../../../../src/utils/helpers';
import { docEntries, docFixtures, rootDocEntries } from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocEntriesListQuery } from './queries';

type GetDocEntriesListContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('get-doc-entries-list', () => {
  beforeEach<GetDocEntriesListContext>(async (context) => {
    context.server = await createAPIServer({
      data: {
        doc: {
          baseUrl: '/doc/',
          path: DOC_FIXTURES_DIR,
        },
      },
    });
  });

  beforeAll(async () => {
    await createFixtures(docFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<GetDocEntriesListContext>('returns the paginated doc entries', async ({
    server,
  }) => {
    const response = await server.sendQuery({ query: getDocEntriesListQuery });

    expect(response.data.doc?.entries?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );
    expect(response.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: response.data.doc?.entries?.edges.length
        ? generateCursor(response.data.doc.entries.edges.length)
        : null,
      hasNextPage: rootDocEntries.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocEntries.length,
    });

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the desired number of doc entries per page', async ({
    server,
  }) => {
    const perPage = 1;
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: { first: perPage },
    });

    expect(response.data.doc?.entries?.edges.length).toBe(perPage);
    expect(response.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(perPage),
      hasNextPage: rootDocEntries.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocEntries.length,
    });

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the doc entries filtered by name', async ({
    server,
  }) => {
    const requestedName = 'a';
    const requestedFixtures = docEntries.filter((entry) =>
      entry.name.includes(requestedName)
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        where: { name: requestedName },
      },
    });

    expect(response.data.doc?.entries?.edges.length).toBe(
      requestedFixturesCount
    );
    expect(response.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the doc entries filtered by parent slug', async ({
    server,
  }) => {
    // An existing directory.
    const requestedSlug = '/excepturi';
    const requestedFixtures = docEntries.filter(
      (entry) => entry.parent?.slug === requestedSlug
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        where: { slug: requestedSlug },
      },
    });

    expect(response.data.doc?.entries?.edges.length).toBe(
      requestedFixturesCount
    );
    expect(response.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the doc entries ordered by name', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'name' },
      },
    });
    const receivedNames = response.data.doc?.entries?.edges.map(
      (edge) => edge.node.name
    );
    const reversedRootDocEntriesNames = rootDocEntries
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocEntriesNames);

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the doc entries ordered by slug', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'slug' },
      },
    });
    const receivedSlugs = response.data.doc?.entries?.edges.map(
      (edge) => edge.node.slug
    );
    const reversedRootDocEntriesSlugs = rootDocEntries
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((file) => file.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootDocEntriesSlugs);

    expect.assertions(2);
  });

  it<GetDocEntriesListContext>('can return the doc entries ordered by creation date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'createdAt' },
      },
    });

    expect(response.data.doc?.entries?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocEntriesListContext>('can return the doc entries ordered by last modification date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'updatedAt' },
      },
    });

    expect(response.data.doc?.entries?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocEntriesListContext>('does not return doc entries if directory is empty', async ({
    server,
  }) => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
    const response = await server.sendQuery({
      query: getDocEntriesListQuery,
    });

    expect(response.data.doc?.entries?.edges.length).toBe(0);
    expect(response.data.doc?.entries?.pageInfo).toBePageInfo({
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
      query: getDocEntriesListQuery,
    });

    expect(response.data.doc?.entries).toBeNull();
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
            "entries",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

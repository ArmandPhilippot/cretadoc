import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import { DEFAULT_EDGES_NUMBER } from '../../../../src/utils/constants';
import { generateCursor } from '../../../../src/utils/helpers';
import { docFiles, docFixtures, rootDocFiles } from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocFilesListQuery } from './queries';

type GetDocFilesListContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('get-doc-files-list', () => {
  beforeEach<GetDocFilesListContext>(async (context) => {
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

  it<GetDocFilesListContext>('returns the paginated doc files', async ({
    server,
  }) => {
    const response = await server.sendQuery({ query: getDocFilesListQuery });

    expect(response.data.doc?.files?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );
    expect(response.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: response.data.doc?.files?.edges.length
        ? generateCursor(response.data.doc.files.edges.length)
        : null,
      hasNextPage: rootDocFiles.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocFiles.length,
    });

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the desired number of doc files per page', async ({
    server,
  }) => {
    const perPage = 1;
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: { first: perPage },
    });

    expect(response.data.doc?.files?.edges.length).toBe(perPage);
    expect(response.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(perPage),
      hasNextPage: rootDocFiles.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocFiles.length,
    });

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the doc files filtered by name', async ({
    server,
  }) => {
    const requestedName = 'a';
    const requestedFixtures = docFiles.filter((file) =>
      file.name.includes(requestedName)
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        where: { name: requestedName },
      },
    });

    expect(response.data.doc?.files?.edges.length).toBe(requestedFixturesCount);
    expect(response.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the doc files filtered by parent slug', async ({
    server,
  }) => {
    // An existing directory slug.
    const requestedSlug = '/excepturi';
    const requestedFixtures = docFiles.filter(
      (file) => file.parent?.slug === requestedSlug
    );
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        where: { slug: requestedSlug },
      },
    });

    expect(response.data.doc?.files?.edges.length).toBe(requestedFixturesCount);
    expect(response.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the doc files ordered by name', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'name' },
      },
    });
    const receivedNames = response.data.doc?.files?.edges.map(
      (edge) => edge.node.name
    );
    const reversedRootDocFilesNames = rootDocFiles
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocFilesNames);

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the doc files ordered by slug', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        orderBy: { direction: 'DESC', field: 'slug' },
      },
    });
    const receivedSlugs = response.data.doc?.files?.edges.map(
      (edge) => edge.node.slug
    );
    const reversedRootDocFilesSlugs = rootDocFiles
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((file) => file.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootDocFilesSlugs);

    expect.assertions(2);
  });

  it<GetDocFilesListContext>('can return the doc files ordered by creation date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'createdAt' },
      },
    });

    expect(response.data.doc?.files?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocFilesListContext>('can return the doc files ordered by last modification date', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
      variables: {
        orderBy: { direction: 'ASC', field: 'updatedAt' },
      },
    });

    expect(response.data.doc?.files?.edges.length).toBeLessThanOrEqual(
      DEFAULT_EDGES_NUMBER
    );

    expect.assertions(1);
  });

  it<GetDocFilesListContext>('does not return doc files if directory is empty', async ({
    server,
  }) => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
    const response = await server.sendQuery({
      query: getDocFilesListQuery,
    });

    expect(response.data.doc?.files?.edges.length).toBe(0);
    expect(response.data.doc?.files?.pageInfo).toBePageInfo({
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
      query: getDocFilesListQuery,
    });

    expect(response.data.doc?.files).toBeNull();
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
            "files",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

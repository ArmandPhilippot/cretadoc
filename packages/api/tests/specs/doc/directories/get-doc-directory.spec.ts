import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import type { DocDirectory } from '../../../../src';
import { docFixtures, rootDocDirectories } from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocDirectoryQuery } from './queries';

type GetDocDirectoryContext = {
  requestedDocDirectory: Maybe<Partial<DocDirectory>>;
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('get-doc-directory', () => {
  beforeEach<GetDocDirectoryContext>(async (context) => {
    context.requestedDocDirectory = rootDocDirectories[0];
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

  it<GetDocDirectoryContext>('can return a doc directory by id', async ({
    requestedDocDirectory,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: { id: requestedDocDirectory?.id },
    });

    if (requestedDocDirectory)
      expect(response.data.doc?.directory).toBeDocDirectory(
        requestedDocDirectory
      );

    expect.assertions(1);
  });

  it<GetDocDirectoryContext>('can return a doc directory by path', async ({
    requestedDocDirectory,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: { path: requestedDocDirectory?.path },
    });

    if (requestedDocDirectory)
      expect(response.data.doc?.directory).toBeDocDirectory(
        requestedDocDirectory
      );

    expect.assertions(1);
  });

  it<GetDocDirectoryContext>('can return a doc directory by slug', async ({
    requestedDocDirectory,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: { slug: requestedDocDirectory?.slug },
    });

    if (requestedDocDirectory)
      expect(response.data.doc?.directory).toBeDocDirectory(
        requestedDocDirectory
      );

    expect.assertions(1);
  });

  it<GetDocDirectoryContext>('returns errors when an argument is not provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: {},
    });

    expect(response.data.doc?.directory).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id, a path or a slug",
            },
          },
          "locations": [
            {
              "column": 5,
              "line": 3,
            },
          ],
          "message": "Not enough arguments",
          "path": [
            "doc",
            "directory",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it<GetDocDirectoryContext>('returns errors when too many arguments are provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: { path: 'foo', slug: '/bar' },
    });

    expect(response.data.doc?.directory).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id, a path or a slug",
            },
          },
          "locations": [
            {
              "column": 5,
              "line": 3,
            },
          ],
          "message": "Too many arguments",
          "path": [
            "doc",
            "directory",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getDocDirectoryQuery,
      variables: { path: 'anyDocDirectory' },
    });

    expect(response.data.doc?.directory).toBeNull();
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
            "directory",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

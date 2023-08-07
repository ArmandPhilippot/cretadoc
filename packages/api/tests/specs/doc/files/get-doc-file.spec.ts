import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import type { DocFile } from '../../../../src';
import { docFixtures, rootDocFiles } from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocFileQuery } from './queries';

type GetDocFileContext = {
  requestedDocFile: Maybe<Partial<DocFile>>;
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('get-doc-file', () => {
  beforeEach<GetDocFileContext>(async (context) => {
    context.requestedDocFile = rootDocFiles[0];
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

  it<GetDocFileContext>('can return a doc file by id', async ({
    requestedDocFile,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: { id: requestedDocFile?.id },
    });

    if (requestedDocFile)
      expect(response.data.doc?.file).toBeDocFile(requestedDocFile);

    expect.assertions(1);
  });

  it<GetDocFileContext>('can return a doc file by path', async ({
    requestedDocFile,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: { path: requestedDocFile?.path },
    });

    if (requestedDocFile)
      expect(response.data.doc?.file).toBeDocFile(requestedDocFile);

    expect.assertions(1);
  });

  it<GetDocFileContext>('can return a doc file by slug', async ({
    requestedDocFile,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: { slug: requestedDocFile?.slug },
    });

    if (requestedDocFile)
      expect(response.data.doc?.file).toBeDocFile(requestedDocFile);

    expect.assertions(1);
  });

  it<GetDocFileContext>('returns errors when an argument is not provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: {},
    });

    expect(response.data.doc?.file).toBeNull();
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
            "file",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it<GetDocFileContext>('returns errors when too many arguments are provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: { path: 'foo', slug: '/bar' },
    });

    expect(response.data.doc?.file).toBeNull();
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
            "file",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getDocFileQuery,
      variables: { path: 'anyDocFile' },
    });

    expect(response.data.doc?.file).toBeNull();
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
            "file",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

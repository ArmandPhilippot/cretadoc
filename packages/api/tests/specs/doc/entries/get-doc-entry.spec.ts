import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import type { DocEntry } from '../../../../src';
import { docFixtures, rootDocEntries } from '../../../fixtures/doc';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
} from '../../../utils/helpers';
import { getDocEntryQuery } from './queries';

type GetDocEntryContext = {
  requestedDocEntry: Maybe<Partial<DocEntry>>;
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('get-doc-entry', () => {
  beforeEach<GetDocEntryContext>(async (context) => {
    context.requestedDocEntry = rootDocEntries[0];
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

  it<GetDocEntryContext>('can return a doc entry by id', async ({
    requestedDocEntry,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: { id: requestedDocEntry?.id },
    });

    if (requestedDocEntry)
      expect(response.data.doc?.entry).toBeDocEntry(requestedDocEntry);

    expect.assertions(1);
  });

  it<GetDocEntryContext>('can return a doc entry by path', async ({
    requestedDocEntry,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: { path: requestedDocEntry?.path },
    });

    if (requestedDocEntry)
      expect(response.data.doc?.entry).toBeDocEntry(requestedDocEntry);

    expect.assertions(1);
  });

  it<GetDocEntryContext>('can return a doc entry by slug', async ({
    requestedDocEntry,
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: { slug: requestedDocEntry?.slug },
    });

    if (requestedDocEntry)
      expect(response.data.doc?.entry).toBeDocEntry(requestedDocEntry);

    expect.assertions(1);
  });

  it<GetDocEntryContext>('returns errors when an argument is not provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: {},
    });

    expect(response.data.doc?.entry).toBeNull();
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
          "message": "An argument is required",
          "path": [
            "doc",
            "entry",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it<GetDocEntryContext>('returns errors when too many arguments are provided', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: { path: 'foo', slug: '/bar' },
    });

    expect(response.data.doc?.entry).toBeNull();
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
            "entry",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: getDocEntryQuery,
      variables: { path: 'anyDocEntry' },
    });

    expect(response.data.doc?.entry).toBeNull();
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
            "entry",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

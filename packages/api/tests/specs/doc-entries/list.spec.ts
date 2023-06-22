/* eslint-disable max-statements */
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { DEFAULT_EDGES_NUMBER } from '../../../src/utils/constants';
import { generateCursor } from '../../../src/utils/helpers';
import { docEntries, docFixtures, rootDocEntries } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { docEntriesQuery } from './doc-entries.queries';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = await createAPIServer({ port: 3260 });

const sendDocEntriesQuery = async (
  variables?: Variables[typeof docEntriesQuery]
) => sendQuery({ api: api.instance, query: docEntriesQuery, variables });

describe('docEntries', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('returns the paginated documentation entries', async () => {
    const response = await sendDocEntriesQuery();

    expect(response.body.data.doc?.entries).not.toBeNull();
    expect(response.body.data.doc?.entries?.edges?.length).toBe(
      rootDocEntries.length
    );
    expect(response.body.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootDocEntries.length),
      hasNextPage: rootDocEntries.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocEntries.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the right number of documentation entries per page', async () => {
    const perPage = 3;
    const response = await sendDocEntriesQuery({ first: perPage });
    const hasNextPage = rootDocEntries.length > perPage;
    const entriesInFirstPage = hasNextPage ? perPage : rootDocEntries.length;

    expect(response.body.data.doc?.entries).not.toBeNull();
    expect(response.body.data.doc?.entries?.edges?.length).toBe(
      entriesInFirstPage
    );
    expect(response.body.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(entriesInFirstPage),
      hasNextPage: rootDocEntries.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocEntries.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation entries filtered by name', async () => {
    const requestedName = 'sch';
    const requestedFixtures = rootDocEntries.filter((file) =>
      file.name.includes(requestedName)
    );
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;

    expect(response.body.data.doc?.entries).not.toBeNull();
    expect(response.body.data.doc?.entries?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation entries in the given path', async () => {
    // An existing subfolders.
    const parentPath = './excepturi';
    const requestedFixtures = docEntries.filter(
      (page) => page.parent?.path === parentPath
    );
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      where: { path: parentPath },
    });
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;

    expect(response.body.data.doc?.entries).not.toBeNull();
    expect(response.body.data.doc?.entries?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation entries ordered by name', async () => {
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.doc?.entries).not.toBeNull();

    const receivedNames = response.body.data.doc?.entries?.edges?.map(
      (edge) => edge.node.name
    );
    const reversedRootDocEntriesNames = rootDocEntries
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocEntriesNames);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation entries ordered by path', async () => {
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'path' },
    });

    expect(response.body.data.doc?.entries?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation entries ordered by creation date', async () => {
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.doc?.entries?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation entries ordered by update date', async () => {
    const response = await sendDocEntriesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(response.body.data.doc?.entries?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docEntriesQuery,
    });

    expect(response.body.data.doc?.entries).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

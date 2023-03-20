/* eslint-disable max-statements */
import { sep } from 'path';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { error } from '../../../src/utils/errors/messages';
import { byNameProp, generateCursor } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  cleanFixtures,
  createAPIServer,
  createFixtures,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { docEntries } from './doc-entries.fixtures';
import { docEntriesQuery } from './doc-entries.queries';

const api = createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = createAPIServer({ port: 3260 });

const sendDocEntriesQuery = async (
  variables?: Variables[typeof docEntriesQuery]
) => sendQuery({ api: api.instance, query: docEntriesQuery, variables });

const rootDocEntries = docEntries
  .sort(byNameProp)
  .filter((entry) => entry.path.replace('./', '').split(sep).length === 1);

describe('docEntries', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(DOC_FIXTURES_DIR);
  });

  it('returns the paginated documentation entries', async () => {
    const defaultReturnNumber = 10;
    const response = await sendDocEntriesQuery();

    expect(response.body.data.doc?.entries).not.toBeNull();
    expect(response.body.data.doc?.entries?.edges?.length).toBe(
      rootDocEntries.length
    );
    expect(response.body.data.doc?.entries?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootDocEntries.length),
      hasNextPage: rootDocEntries.length > defaultReturnNumber,
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
    const perPage = 10;
    const requestedName = 'sch';
    const requestedFixtures = rootDocEntries.filter((file) =>
      file.name.includes(requestedName)
    );
    const response = await sendDocEntriesQuery({
      first: perPage,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > perPage;
    const requestedFixturesCount = hasNextPage
      ? perPage
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
    const perPage = 10;
    // An existing subfolders.
    const parentPath = './excepturi';
    const requestedFixtures = docEntries.filter(
      (page) => page.parent?.path === parentPath
    );
    const response = await sendDocEntriesQuery({
      first: perPage,
      where: { path: parentPath },
    });
    const hasNextPage = requestedFixtures.length > perPage;
    const requestedFixturesCount = hasNextPage
      ? perPage
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
    const perPage = 10;
    const response = await sendDocEntriesQuery({
      first: perPage,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.doc?.entries).not.toBeNull();

    const receivedNames = response.body.data.doc?.entries?.edges?.map(
      (edge) => edge.node.name
    );
    const rootDocEntriesNames = rootDocEntries
      .slice(0, perPage)
      .map((page) => page.name);

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(rootDocEntriesNames.reverse());

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation entries ordered by path', async () => {
    const perPage = 10;
    const response = await sendDocEntriesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'path' },
    });

    expect(response.body.data.doc?.entries?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation entries ordered by creation date', async () => {
    const perPage = 10;
    const response = await sendDocEntriesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.doc?.entries?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation entries ordered by update date', async () => {
    const perPage = 10;
    const response = await sendDocEntriesQuery({
      first: perPage,
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
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.loader('Documentation'),
    });
  });
});

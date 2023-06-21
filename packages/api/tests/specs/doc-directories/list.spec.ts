/* eslint-disable max-statements */
import { sep } from 'path';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { byNameProp, generateCursor } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
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
import { docDirectories } from './doc-directories.fixtures';
import { docDirectoriesQuery } from './doc-directories.queries';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = await createAPIServer({ port: 3260 });

const sendDocDirectoriesQuery = async (
  variables?: Variables[typeof docDirectoriesQuery]
) => sendQuery({ api: api.instance, query: docDirectoriesQuery, variables });

const rootDocDirectories = [...docDirectories]
  .sort(byNameProp)
  .filter((dir) => dir.path.replace('./', '').split(sep).length === 1);

describe('docDirectories', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('returns the paginated documentation directories', async () => {
    const defaultReturnNumber = 10;
    const response = await sendDocDirectoriesQuery();

    expect(response.body.data.doc?.directories).not.toBeNull();
    expect(response.body.data.doc?.directories?.edges?.length).toBe(
      rootDocDirectories.length
    );
    expect(response.body.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootDocDirectories.length),
      hasNextPage: rootDocDirectories.length > defaultReturnNumber,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocDirectories.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the right number of documentation directories per page', async () => {
    const perPage = 3;
    const response = await sendDocDirectoriesQuery({ first: perPage });
    const hasNextPage = rootDocDirectories.length > perPage;
    const directoriesInFirstPage = hasNextPage
      ? perPage
      : rootDocDirectories.length;

    expect(response.body.data.doc?.directories).not.toBeNull();
    expect(response.body.data.doc?.directories?.edges?.length).toBe(
      directoriesInFirstPage
    );
    expect(response.body.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(directoriesInFirstPage),
      hasNextPage: rootDocDirectories.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocDirectories.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation directories filtered by name', async () => {
    const perPage = 10;
    const requestedName = 'ex';
    const requestedFixtures = rootDocDirectories.filter((page) =>
      page.name.includes(requestedName)
    );
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > perPage;
    const requestedFixturesCount = hasNextPage
      ? perPage
      : requestedFixtures.length;

    expect(response.body.data.doc?.directories).not.toBeNull();
    expect(response.body.data.doc?.directories?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation directories in the given path', async () => {
    const perPage = 10;
    // An existing subfolders.
    const parentPath = './excepturi';
    const requestedFixtures = docDirectories.filter(
      (page) => page.parent?.path === parentPath
    );
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      where: { path: parentPath },
    });
    const hasNextPage = requestedFixtures.length > perPage;
    const requestedFixturesCount = hasNextPage
      ? perPage
      : requestedFixtures.length;

    expect(response.body.data.doc?.directories).not.toBeNull();
    expect(response.body.data.doc?.directories?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.directories?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation directories ordered by name', async () => {
    const perPage = 10;
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.doc?.directories).not.toBeNull();

    const receivedNames = response.body.data.doc?.directories?.edges?.map(
      (edge) => edge.node.name
    );
    const reversedRootDocDirectoriesNames = rootDocDirectories
      .slice(0, perPage)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocDirectoriesNames);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation directories ordered by slug', async () => {
    const perPage = 10;
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      orderBy: { direction: 'DESC', field: 'slug' },
    });

    expect(response.body.data.doc?.directories).not.toBeNull();

    const receivedSlugs = response.body.data.doc?.directories?.edges?.map(
      (edge) => edge.node.slug
    );
    const reversedRootDocDirectoriesSlugs = rootDocDirectories
      .slice(0, perPage)
      .map((page) => page.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootDocDirectoriesSlugs);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation directories ordered by path', async () => {
    const perPage = 10;
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'path' },
    });

    expect(response.body.data.doc?.directories?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation directories ordered by creation date', async () => {
    const perPage = 10;
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.doc?.directories?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation directories ordered by update date', async () => {
    const perPage = 10;
    const response = await sendDocDirectoriesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(response.body.data.doc?.directories?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docDirectoriesQuery,
    });

    expect(response.body.data.doc?.directories).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

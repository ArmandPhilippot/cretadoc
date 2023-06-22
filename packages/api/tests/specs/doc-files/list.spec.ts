/* eslint-disable max-statements */
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { DEFAULT_EDGES_NUMBER } from '../../../src/utils/constants';
import { generateCursor } from '../../../src/utils/helpers';
import { docFiles, docFixtures, rootDocFiles } from '../../fixtures/doc';
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
import { docFilesQuery } from './doc-files.queries';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = await createAPIServer({ port: 3260 });

const sendDocFilesQuery = async (variables?: Variables[typeof docFilesQuery]) =>
  sendQuery({ api: api.instance, query: docFilesQuery, variables });

describe('docFiles', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('returns the paginated documentation files', async () => {
    const response = await sendDocFilesQuery();

    expect(response.body.data.doc?.files).not.toBeNull();
    expect(response.body.data.doc?.files?.edges?.length).toBe(
      rootDocFiles.length
    );
    expect(response.body.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootDocFiles.length),
      hasNextPage: rootDocFiles.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocFiles.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the right number of documentation files per page', async () => {
    const perPage = 3;
    const response = await sendDocFilesQuery({ first: perPage });
    const hasNextPage = rootDocFiles.length > perPage;
    const filesInFirstPage = hasNextPage ? perPage : rootDocFiles.length;

    expect(response.body.data.doc?.files).not.toBeNull();
    expect(response.body.data.doc?.files?.edges?.length).toBe(filesInFirstPage);
    expect(response.body.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(filesInFirstPage),
      hasNextPage: rootDocFiles.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootDocFiles.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation files filtered by name', async () => {
    const requestedName = 'sch';
    const requestedFixtures = rootDocFiles.filter((file) =>
      file.name.includes(requestedName)
    );
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;

    expect(response.body.data.doc?.files).not.toBeNull();
    expect(response.body.data.doc?.files?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the documentation files in the given path', async () => {
    // An existing subfolders.
    const parentPath = './excepturi';
    const requestedFixtures = docFiles.filter(
      (page) => page.parent?.path === parentPath
    );
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      where: { path: parentPath },
    });
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;

    expect(response.body.data.doc?.files).not.toBeNull();
    expect(response.body.data.doc?.files?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.doc?.files?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation files ordered by name', async () => {
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.doc?.files).not.toBeNull();

    const receivedNames = response.body.data.doc?.files?.edges?.map(
      (edge) => edge.node.name
    );
    const reversedRootDocFilesNames = rootDocFiles
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootDocFilesNames);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation files ordered by slug', async () => {
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'slug' },
    });

    expect(response.body.data.doc?.files).not.toBeNull();

    const receivedSlugs = response.body.data.doc?.files?.edges?.map(
      (edge) => edge.node.slug
    );
    const reversedRootDocFilesSlugs = rootDocFiles
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootDocFilesSlugs);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the documentation files ordered by path', async () => {
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'path' },
    });

    expect(response.body.data.doc?.files?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation files ordered by creation date', async () => {
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.doc?.files?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the documentation files ordered by update date', async () => {
    const response = await sendDocFilesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(response.body.data.doc?.files?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docFilesQuery,
    });

    expect(response.body.data.doc?.files).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

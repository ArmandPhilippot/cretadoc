/* eslint-disable max-statements */
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { PageConnectionPayload } from '../../../src/types';
import { DEFAULT_EDGES_NUMBER } from '../../../src/utils/constants';
import { generateCursor } from '../../../src/utils/helpers';
import { pagesFixtures, rootPages } from '../../fixtures/pages';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { pagesQuery } from './pages.queries';

const api = await createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = await createAPIServer({ port: 3260 });

const sendPagesQuery = async (variables?: Variables[typeof pagesQuery]) =>
  sendQuery({ api: api.instance, query: pagesQuery, variables });

describe('pages', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it('returns the paginated pages', async () => {
    const response = await sendPagesQuery();

    expect(response.body.data.pages).not.toBeNull();
    expect(response.body.data.pages?.edges?.length).toBe(rootPages.length);
    expect(response.body.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootPages.length),
      hasNextPage: rootPages.length > DEFAULT_EDGES_NUMBER,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootPages.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the right number of pages per page', async () => {
    const perPage = 3;
    const response = await sendPagesQuery({ first: perPage });

    expect(response.body.data.pages).not.toBeNull();
    expect(response.body.data.pages?.edges?.length).toBe(perPage);
    expect(response.body.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(perPage),
      hasNextPage: rootPages.length > perPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: rootPages.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('return the pages filtered by name', async () => {
    const requestedName = 'in';
    const requestedFixtures = rootPages.filter((page) =>
      page.name.includes(requestedName)
    );
    const response = await sendPagesQuery({
      first: DEFAULT_EDGES_NUMBER,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > DEFAULT_EDGES_NUMBER;
    const requestedFixturesCount = hasNextPage
      ? DEFAULT_EDGES_NUMBER
      : requestedFixtures.length;

    expect(response.body.data.pages).not.toBeNull();
    expect(response.body.data.pages?.edges?.length).toBe(
      requestedFixturesCount
    );
    expect(response.body.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(requestedFixturesCount),
      hasNextPage,
      hasPreviousPage: false,
      startCursor: generateCursor(1),
      total: requestedFixtures.length,
    });

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the pages ordered by name', async () => {
    const response = await sendPagesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.pages).not.toBeNull();

    const receivedNames = response.body.data.pages?.edges?.map(
      (edge) => edge.node.name
    );
    const reversedRootPagesNames = rootPages
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.name)
      .reverse();

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(reversedRootPagesNames);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the pages ordered by slug', async () => {
    const response = await sendPagesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'slug' },
    });

    expect(response.body.data.pages).not.toBeNull();

    const receivedSlugs = response.body.data.pages?.edges?.map(
      (edge) => edge.node.slug
    );
    const reversedRootPagesSlugs = rootPages
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.slug)
      .reverse();

    expect(receivedSlugs).not.toBeUndefined();
    expect(receivedSlugs).toStrictEqual(reversedRootPagesSlugs);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the pages ordered by creation date', async () => {
    const response = await sendPagesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.pages?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the pages ordered by update date', async () => {
    const response = await sendPagesQuery({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(response.body.data.pages?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('does not return pages if directory is empty', async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
    const response = await sendPagesQuery();

    expect(response.body.data.pages).not.toBeNull();
    expect(response.body.data.pages?.edges?.length).toBe(0);
    expect(response.body.data.pages?.pageInfo).toBePageInfo({
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      total: 0,
    });

    await createFixtures(pagesFixtures);

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: pagesQuery,
    });

    expect(response.body.data.pages).toBeNull();
    const body = response.body as QueryResultWithErrors<PageConnectionPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

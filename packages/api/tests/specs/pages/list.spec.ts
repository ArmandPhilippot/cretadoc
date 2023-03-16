/* eslint-disable max-statements */
import { sep } from 'path';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { PageConnectionPayload } from '../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { error } from '../../../src/utils/errors/messages';
import { byNameProp, generateCursor } from '../../../src/utils/helpers';
import { pagesFixtures } from '../../fixtures/pages';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import {
  cleanFixtures,
  createAPIServer,
  createFixtures,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { pages } from './pages.fixtures';
import { pagesQuery } from './pages.queries';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3210,
});

const misconfiguredAPI = createAPIServer({ port: 3260 });

const sendPagesQuery = async (variables?: Variables[typeof pagesQuery]) =>
  sendQuery({ api: api.instance, query: pagesQuery, variables });

const rootPages = pages
  .sort(byNameProp)
  .filter((page) => page.path.replace('./', '').split(sep).length === 1)
  .filter((page) => page.path.endsWith(MARKDOWN_EXTENSION));

describe('pages', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(PAGES_FIXTURES_DIR);
  });

  it('returns the paginated pages', async () => {
    const defaultReturnNumber = 10;
    const response = await sendPagesQuery();

    expect(response.body.data.pages).not.toBeNull();
    expect(response.body.data.pages?.edges?.length).toBe(rootPages.length);
    expect(response.body.data.pages?.pageInfo).toBePageInfo({
      endCursor: generateCursor(rootPages.length),
      hasNextPage: rootPages.length > defaultReturnNumber,
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
    const perPage = 10;
    const requestedName = 'in';
    const requestedFixtures = rootPages.filter((page) =>
      page.name.includes(requestedName)
    );
    const response = await sendPagesQuery({
      first: perPage,
      where: { name: requestedName },
    });
    const hasNextPage = requestedFixtures.length > perPage;
    const requestedFixturesCount = hasNextPage
      ? perPage
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
    const perPage = 10;
    const response = await sendPagesQuery({
      first: perPage,
      orderBy: { direction: 'DESC', field: 'name' },
    });

    expect(response.body.data.pages).not.toBeNull();

    const receivedNames = response.body.data.pages?.edges?.map(
      (edge) => edge.node.name
    );
    const rootPagesNames = rootPages.slice(0, perPage).map((page) => page.name);

    expect(receivedNames).not.toBeUndefined();
    expect(receivedNames).toStrictEqual(rootPagesNames.reverse());

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns the pages ordered by creation date', async () => {
    const perPage = 10;
    const response = await sendPagesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(response.body.data.pages?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns the pages ordered by update date', async () => {
    const perPage = 10;
    const response = await sendPagesQuery({
      first: perPage,
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(response.body.data.pages?.edges).not.toBeNull();

    expect.assertions(1);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: pagesQuery,
    });

    expect(response.body.data.pages).toBeNull();
    const body = response.body as QueryResultWithErrors<PageConnectionPayload>;
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.loader('Page'),
    });
  });
});

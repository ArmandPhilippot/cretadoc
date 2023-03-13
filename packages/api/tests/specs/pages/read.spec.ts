/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { PagePayload } from '../../../src/types';
import { error } from '../../../src/utils/errors/messages';
import { pagesFixtures } from '../../fixtures/pages';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { cleanFixtures, createFixtures } from '../../utils/helpers/fixtures';
import { pages } from './pages.fixtures';
import { pageQuery } from './pages.queries';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3200,
});

const sendPageQuery = async (variables?: Variables[typeof pageQuery]) =>
  sendQuery({ api: api.instance, query: pageQuery, variables });

describe('page', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(PAGES_FIXTURES_DIR);
  });

  it('returns a page by id', async () => {
    const firstPage = pages[0];

    if (!firstPage) throw new Error('Pages fixtures are missing.');

    const response = await sendPageQuery({ id: firstPage.id });

    expect(response.body.data).not.toBeNull();
    expect(response.body.data.page).toBePage(firstPage);
    expect.assertions(2);
  });

  it('returns a page by name', async () => {
    const firstPage = pages[0];

    if (!firstPage) throw new Error('Pages fixtures are missing.');

    const response = await sendPageQuery({ name: firstPage.name });

    expect(response.body.data.page).not.toBeNull();
    expect(response.body.data.page).toBePage(firstPage);
    expect.assertions(2);
  });

  it('returns an error if both id and name are missing', async () => {
    const response = await sendPageQuery();

    expect(response.body.data.page).toBeNull();
    const body = response.body as QueryResultWithErrors<PagePayload>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
    expect.assertions(2);
  });

  it('returns an error if both id and name are given', async () => {
    const response = await sendPageQuery({ id: 'anyId', name: 'anyName' });

    expect(response.body.data.page).toBeNull();
    const body = response.body as QueryResultWithErrors<PagePayload>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.invalid.input,
    });
    expect.assertions(2);
  });
});

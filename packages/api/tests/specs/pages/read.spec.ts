/* eslint-disable @typescript-eslint/no-magic-numbers */
import { isObject, isObjKeyExist } from '@cretadoc/utils';
import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { PageInput } from '../../../src/types';
import { DEFAULT_ENDPOINT } from '../../../src/utils/constants';
import { error } from '../../../src/utils/errors/messages';
import { pagesFixtures } from '../../fixtures/pages';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import { createAPIServer } from '../../utils/helpers';
import { cleanFixtures, createFixtures } from '../../utils/helpers/fixtures';
import { pages } from './pages.fixtures';
import { pageQuery } from './pages.queries';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3200,
});

const sendPageQuery = async (variables?: Partial<PageInput>) =>
  request(api.instance)
    .post(DEFAULT_ENDPOINT)
    .send({ query: pageQuery, variables });

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

    if (isObject(response.body) && isObjKeyExist(response.body, 'data'))
      expect(response.body.data).toReturnPage({ page: firstPage });

    expect.assertions(1);
  });

  it('returns a page by name', async () => {
    const firstPage = pages[0];

    if (!firstPage) throw new Error('Pages fixtures are missing.');

    const response = await sendPageQuery({ name: firstPage.name });

    if (isObject(response.body) && isObjKeyExist(response.body, 'data'))
      expect(response.body.data).toReturnPage({ page: firstPage });

    expect.assertions(1);
  });

  it('returns an error if both id and name are missing', async () => {
    const response = await sendPageQuery();

    expect(response.body).toReturnException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
  });

  it('returns an error if both id and name are given', async () => {
    const response = await sendPageQuery({ id: 'anyId', name: 'anyName' });

    expect(response.body).toReturnException({
      code: 'BAD_USER_INPUT',
      message: error.invalid.input,
    });
  });
});

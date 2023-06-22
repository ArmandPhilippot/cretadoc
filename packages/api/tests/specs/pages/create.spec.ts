import {
  isObject,
  isObjKeyExist,
  slugify,
  type Nullable,
} from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  PageCreateErrors,
  PageCreatePayload,
  PageCreateResult,
  PagePayload,
} from '../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { pages, pagesFixtures } from '../../fixtures/pages';
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
import { pageCreate } from './pages.mutations';

const api = await createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = await createAPIServer({ port: 3270 });

const createPage = async (variables?: Variables[typeof pageCreate]) =>
  sendQuery({ api: api.instance, query: pageCreate, variables });

const isPagePayload = (
  payload: Nullable<PageCreatePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageCreatePayload>
): payload is PageCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('pageCreate', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it('can create a new page without content', async () => {
    const newPageName = 'odio';
    const newPagePath = `./${newPageName}${MARKDOWN_EXTENSION}`;
    const response = await createPage({ input: { name: newPageName } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPagePayload(response.body.data.pageCreate))
      expect(response.body.data.pageCreate.page).toBePage({
        contents: '',
        id: generateBase64String(newPagePath),
        name: newPageName,
        path: newPagePath,
        slug: `/${slugify(newPageName)}`,
      });

    expect.assertions(2);
  });

  it('can create a new page with content', async () => {
    const newPageContents =
      'Error impedit voluptates veritatis minima. Quasi ut rem iusto soluta corporis expedita earum consectetur quis. Est porro quia qui nobis repellat dicta quis. Explicabo harum odit veniam harum expedita est temporibus. Optio molestias doloribus et asperiores officia aperiam enim. Et dolor placeat.';
    const newPageName = 'impedit';
    const newPagePath = `./${newPageName}${MARKDOWN_EXTENSION}`;
    const response = await createPage({
      input: { name: newPageName, contents: newPageContents },
    });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPagePayload(response.body.data.pageCreate))
      expect(response.body.data.pageCreate.page).toBePage({
        contents: newPageContents,
        id: generateBase64String(newPagePath),
        name: newPageName,
        path: newPagePath,
        slug: `/${slugify(newPageName)}`,
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const response = await createPage({ input: { name: '<' } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.contents).toBeNull();
      expect(response.body.data.pageCreate.errors.name?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when name is too long', async () => {
    const pageName =
      'Voluptas aut ipsum quaerat est officia non sapiente eos. Aut rerum ipsum qui. Cupiditate inventore rerum eos aut amet ut. Ducimus aspernatur necessitatibus pariatur sed consequatur. Similique ad qui repudiandae qui inventore eum quod sapiente. Quis odit amet voluptate omnis aliquam eum similique nihil. Dolorum id qui earum modi et suscipit voluptates et. Cumque minima illo voluptates perferendis recusandae. Vel cupiditate odio. Et excepturi ea eum blanditiis aut.';
    const response = await createPage({ input: { name: pageName } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.contents).toBeNull();
      expect(response.body.data.pageCreate.errors.name?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the name is already taken', async () => {
    const existingPage = pages[0];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const response = await createPage({ input: { name: existingPage.name } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.contents).toBeNull();
      expect(response.body.data.pageCreate.errors.name?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: pageCreate,
      variables: { input: { name: 'anyNameSinceErrorIsExpected' } },
    });

    expect(response.body.data.pageCreate).toBeNull();
    const body = response.body as QueryResultWithErrors<PageCreateResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type {
  PageCreateErrors,
  PageCreatePayload,
  PageCreateResult,
  PagePayload,
} from 'src/types';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { error } from '../../../src/utils/errors/messages';
import { generateBase64String } from '../../../src/utils/helpers';
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
import { pageCreate } from './pages.mutations';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = createAPIServer({ port: 3270 });

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
    await cleanFixtures(PAGES_FIXTURES_DIR);
  });

  it('can create a new page without content', async () => {
    const newPageName = 'odio';
    const newPagePath = `./${newPageName}${MARKDOWN_EXTENSION}`;
    const response = await createPage({ input: { name: newPageName } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPagePayload(response.body.data.pageCreate))
      expect(response.body.data.pageCreate.page).toBePage({
        content: '',
        id: generateBase64String(newPagePath),
        name: newPageName,
        path: newPagePath,
      });

    expect.assertions(2);
  });

  it('can create a new page with content', async () => {
    const newPageContent =
      'Error impedit voluptates veritatis minima. Quasi ut rem iusto soluta corporis expedita earum consectetur quis. Est porro quia qui nobis repellat dicta quis. Explicabo harum odit veniam harum expedita est temporibus. Optio molestias doloribus et asperiores officia aperiam enim. Et dolor placeat.';
    const newPageName = 'impedit';
    const newPagePath = `./${newPageName}${MARKDOWN_EXTENSION}`;
    const response = await createPage({
      input: { name: newPageName, content: newPageContent },
    });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPagePayload(response.body.data.pageCreate))
      expect(response.body.data.pageCreate.page).toBePage({
        content: newPageContent,
        id: generateBase64String(newPagePath),
        name: newPageName,
        path: newPagePath,
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const forbiddenChar = '<';
    const expectedErrors = [error.validation.file.name];
    const response = await createPage({ input: { name: forbiddenChar } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.content).toBeNull();
      expect(response.body.data.pageCreate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when name is too long', async () => {
    const pageName =
      'Voluptas aut ipsum quaerat est officia non sapiente eos. Aut rerum ipsum qui. Cupiditate inventore rerum eos aut amet ut. Ducimus aspernatur necessitatibus pariatur sed consequatur. Similique ad qui repudiandae qui inventore eum quod sapiente. Quis odit amet voluptate omnis aliquam eum similique nihil. Dolorum id qui earum modi et suscipit voluptates et. Cumque minima illo voluptates perferendis recusandae. Vel cupiditate odio. Et excepturi ea eum blanditiis aut.';
    const expectedErrors = [
      error.validation.string.length({ max: 255, min: 1 }),
    ];
    const response = await createPage({ input: { name: pageName } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.content).toBeNull();
      expect(response.body.data.pageCreate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the name is already taken', async () => {
    const existingPage = pages[0];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const expectedErrors = [error.validation.existent('page')];
    const response = await createPage({ input: { name: existingPage.name } });

    expect(response.body.data.pageCreate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageCreate)) {
      expect(response.body.data.pageCreate.errors.content).toBeNull();
      expect(response.body.data.pageCreate.errors.name).toStrictEqual(
        expectedErrors
      );
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
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.mutator('Page'),
    });
  });
});

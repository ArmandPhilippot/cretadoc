import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type {
  PageDeleteErrors,
  PageDeletePayload,
  PageDeleteResult,
  PagePayload,
} from 'src/types';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { error } from '../../../src/utils/errors/messages';
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
import { pageDelete } from './pages.mutations';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3230,
});

const misconfiguredAPI = createAPIServer({ port: 3280 });

const deletePage = async (variables?: Variables[typeof pageDelete]) =>
  sendQuery({ api: api.instance, query: pageDelete, variables });

const isPagePayload = (
  payload: Nullable<PageDeletePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageDeletePayload>
): payload is PageDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('pageDelete', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(PAGES_FIXTURES_DIR);
  });

  it('can delete a page by id', async () => {
    const existingPage = pages[0];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const response = await deletePage({ input: { id: existingPage.id } });

    expect(response.body.data.pageDelete).not.toBeNull();

    if (isPagePayload(response.body.data.pageDelete))
      expect(response.body.data.pageDelete.page).toBePage({
        id: existingPage.id,
        name: existingPage.name,
        path: existingPage.path,
        contents: existingPage.contents,
      });

    expect.assertions(2);
  });

  it('can delete a page by name', async () => {
    const existingPage = pages[1];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const response = await deletePage({ input: { name: existingPage.name } });

    expect(response.body.data.pageDelete).not.toBeNull();

    if (isPagePayload(response.body.data.pageDelete))
      expect(response.body.data.pageDelete.page).toBePage({
        id: existingPage.id,
        name: existingPage.name,
        path: existingPage.path,
        contents: existingPage.contents,
      });

    expect.assertions(2);
  });

  it('returns validation errors when the page does not exist', async () => {
    // A previously deleted page.
    const existingPage = pages[1];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const response = await deletePage({ input: { name: existingPage.name } });
    const expectedErrors = [error.validation.missing('page')];

    expect(response.body.data.pageDelete).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageDelete)) {
      expect(response.body.data.pageDelete.errors.id).toBeNull();
      expect(response.body.data.pageDelete.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'est';
    const response = await deletePage({
      input: { id: invalidId },
    });

    expect(response.body.data.pageDelete).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageDelete)) {
      expect(response.body.data.pageDelete.errors.name).toBeNull();
      expect(response.body.data.pageDelete.errors.id).toContain(
        error.validation.format.id
      );
      expect(response.body.data.pageDelete.errors.id).toContain(
        error.validation.missing('page')
      );
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the name is invalid', async () => {
    const invalidName = '<';
    const response = await deletePage({
      input: { name: invalidName },
    });

    expect(response.body.data.pageDelete).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageDelete)) {
      expect(response.body.data.pageDelete.errors.id).toBeNull();
      expect(response.body.data.pageDelete.errors.name).toContain(
        error.validation.file.name
      );
      expect(response.body.data.pageDelete.errors.name).toContain(
        error.validation.missing('page')
      );
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns an error if both id and name are missing', async () => {
    const response = await deletePage({ input: {} });

    expect(response.body.data.pageDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<PageDeleteResult>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
    expect.assertions(2);
  });

  it('returns an error if both id and name are given', async () => {
    const response = await deletePage({
      input: { id: 'anyId', name: 'anyName' },
    });

    expect(response.body.data.pageDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<PageDeleteResult>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.invalid.input,
    });
    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: pageDelete,
      variables: { input: { name: 'anyNameSinceErrorIsExpected' } },
    });

    expect(response.body.data.pageDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<PageDeleteResult>;
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.mutator('Page'),
    });
  });
});

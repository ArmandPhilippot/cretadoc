/* eslint-disable max-statements */
import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  PagePayload,
  PageUpdateErrors,
  PageUpdatePayload,
  PageUpdateResult,
} from '../../../src/types';
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
import { pageUpdate } from './pages.mutations';

const api = createAPIServer({
  data: { pages: PAGES_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = createAPIServer({ port: 3270 });

const updatePage = async (variables?: Variables[typeof pageUpdate]) =>
  sendQuery({ api: api.instance, query: pageUpdate, variables });

const isPagePayload = (
  payload: Nullable<PageUpdatePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageUpdatePayload>
): payload is PageUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('pageUpdate', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(PAGES_FIXTURES_DIR);
  });

  it('can update a page without changing name and content', async () => {
    const existingPage = pages[0];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const response = await updatePage({ input: { id: existingPage.id } });

    expect(response.body.data.pageUpdate).not.toBeNull();

    if (isPagePayload(response.body.data.pageUpdate))
      expect(response.body.data.pageUpdate.page).toBePage({
        content: existingPage.content,
        id: existingPage.id,
        name: existingPage.name,
        path: existingPage.path,
      });

    expect.assertions(2);
  });

  it('can update the name of a page', async () => {
    const existingPage = pages[0];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const newPageName = 'facere';
    const newPagePath = `./${newPageName}${MARKDOWN_EXTENSION}`;
    const response = await updatePage({
      input: { id: existingPage.id, name: newPageName },
    });

    expect(response.body.data.pageUpdate).not.toBeNull();

    if (isPagePayload(response.body.data.pageUpdate))
      expect(response.body.data.pageUpdate.page).toBePage({
        content: existingPage.content,
        id: generateBase64String(newPagePath),
        name: newPageName,
        path: newPagePath,
      });

    expect.assertions(2);
  });

  it('can update the content of a page', async () => {
    const existingPage = pages[1];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const newPageContent =
      'Esse pariatur tenetur. Deserunt et unde ut magnam officia rem doloremque optio non. Qui amet doloremque adipisci aliquam dicta in nulla sint. Fugit velit facilis impedit et.';
    const response = await updatePage({
      input: { id: existingPage.id, content: newPageContent },
    });

    expect(response.body.data.pageUpdate).not.toBeNull();

    if (isPagePayload(response.body.data.pageUpdate))
      expect(response.body.data.pageUpdate.page).toBePage({
        content: newPageContent,
        id: existingPage.id,
        name: existingPage.name,
        path: existingPage.path,
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const existingPage = pages[2];

    if (!existingPage) throw new Error('Pages fixtures are missing.');

    const forbiddenChar = '>';
    const expectedErrors = [error.validation.file.name];
    const response = await updatePage({
      input: { id: existingPage.id, name: forbiddenChar },
    });

    expect(response.body.data.pageUpdate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageUpdate)) {
      expect(response.body.data.pageUpdate.errors.content).toBeNull();
      expect(response.body.data.pageUpdate.errors.id).toStrictEqual([]);
      expect(response.body.data.pageUpdate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'sed dolores ut';
    const expectedErrors = [
      error.validation.format.id,
      error.validation.missing('page'),
    ];
    const response = await updatePage({ input: { id: invalidId } });

    expect(response.body.data.pageUpdate).not.toBeNull();

    if (isPageValidationErrors(response.body.data.pageUpdate)) {
      expect(response.body.data.pageUpdate.errors.content).toBeNull();
      expect(response.body.data.pageUpdate.errors.id).toStrictEqual(
        expectedErrors
      );
      expect(response.body.data.pageUpdate.errors.name).toBeNull();
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: pageUpdate,
      variables: { input: { id: 'anyIdSinceErrorIsExpected' } },
    });

    expect(response.body.data.pageUpdate).toBeNull();
    const body = response.body as QueryResultWithErrors<PageUpdateResult>;
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.mutator('Page'),
    });
  });
});
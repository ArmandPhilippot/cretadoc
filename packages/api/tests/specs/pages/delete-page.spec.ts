import { writeFile } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  PageDeleteErrors,
  PageDeletePayload,
  PagePayload,
} from '../../../src';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../utils/helpers';
import { deletePageMutation } from './mutations';

const isPagePayload = (
  payload: Nullable<PageDeletePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageDeletePayload>
): payload is PageDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type DeletePageContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('delete-page', () => {
  beforeEach<DeletePageContext>(async (context) => {
    context.server = await createAPIServer({
      data: { pages: PAGES_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it<DeletePageContext>('can delete a page by id', async ({ server }) => {
    const pageName = 'dolore';
    const pageContents = 'illum id nemo';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {
          id: pageId,
        },
      },
    });

    if (isPagePayload(response.data.pageDelete))
      expect(response.data.pageDelete.page).toBePage({
        contents: pageContents,
        id: pageId,
        name: pageName,
        path: relativePagePath,
      });

    expect.assertions(1);
  });

  it<DeletePageContext>('can delete a page by name', async ({ server }) => {
    const pageName = 'repudiandae';
    const pageContents = 'minus cumque incidunt';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {
          name: pageName,
        },
      },
    });

    if (isPagePayload(response.data.pageDelete))
      expect(response.data.pageDelete.page).toBePage({
        contents: pageContents,
        name: pageName,
        path: relativePagePath,
      });

    expect.assertions(1);
  });

  it<DeletePageContext>('returns validation errors when the page id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {
          id: 'anyInvalidId',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageDelete))
      expect(response.data.pageDelete.errors).toMatchInlineSnapshot(`
        {
          "id": [
            "Invalid id",
            "The requested page does not exist",
          ],
          "name": null,
        }
      `);

    expect.assertions(1);
  });

  it<DeletePageContext>('returns validation errors when the page name does not exist', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {
          name: 'anyInvalidName',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageDelete))
      expect(response.data.pageDelete.errors).toMatchInlineSnapshot(`
        {
          "id": null,
          "name": [
            "The requested page does not exist",
          ],
        }
      `);

    expect.assertions(1);
  });

  it<DeletePageContext>('returns an error when input is missing either id or name', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {},
      },
    });

    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id or a name",
            },
          },
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "Missing required argument",
          "path": [
            "pageDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it<DeletePageContext>('returns an error when both id and name are provided in input', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: {
        input: {
          id: 'anyId',
          name: 'anyName',
        },
      },
    });

    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id or a name",
            },
          },
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "Too many arguments",
          "path": [
            "pageDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it('returns an unexpected error when pages dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: deletePageMutation,
      variables: { input: { name: 'anyName' } },
    });

    expect(response.data.pageDelete).toBeNull();
    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "locations": [
            {
              "column": 3,
              "line": 2,
            },
          ],
          "message": "Unexpected error.",
          "path": [
            "pageDelete",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

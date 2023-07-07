import { writeFile } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  PagePayload,
  PageUpdateErrors,
  PageUpdatePayload,
} from '../../../src';
import type { Meta } from '../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../utils/helpers';
import { updatePageMutation } from './mutations';

const isPagePayload = (
  payload: Nullable<PageUpdatePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageUpdatePayload>
): payload is PageUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type UpdatePageContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('update-page', () => {
  beforeEach<UpdatePageContext>(async (context) => {
    context.server = await createAPIServer({
      data: { pages: PAGES_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it<UpdatePageContext>('can update a page without changes', async ({
    server,
  }) => {
    const pageName = 'quae';
    const pageContents = 'cupiditate magni accusantium';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: pageId,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate))
      expect(response.data.pageUpdate.page).toBePage({
        contents: pageContents,
        id: pageId,
        name: pageName,
        path: relativePagePath,
      });

    expect.assertions(1);
  });

  it<UpdatePageContext>('can update the name of a page', async ({ server }) => {
    const pageName = 'sed';
    const pageContents = 'est minus deleniti';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const newPageName = 'voluptatem';
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: pageId,
          name: newPageName,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate)) {
      expect(response.data.pageUpdate.page).toBePage({
        contents: pageContents,
        name: newPageName,
      });
      expect(response.data.pageUpdate.page?.id).not.toBe(pageId);
    }

    expect.assertions(2);
  });

  it<UpdatePageContext>('can update the contents of a page', async ({
    server,
  }) => {
    const pageName = 'minima';
    const pageContents = 'in dolorem eaque';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const newPageContents = 'sed debitis sint';
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: pageId,
          contents: newPageContents,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate))
      expect(response.data.pageUpdate.page).toBePage({
        contents: newPageContents,
        id: pageId,
        name: pageName,
        path: relativePagePath,
      });

    expect.assertions(1);
  });

  it<UpdatePageContext>('can update the meta of a page', async ({ server }) => {
    const pageName = 'dolorem';
    const pageContents = 'voluptate ut quibusdam';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), pageContents, {
      encoding: 'utf8',
    });

    const newPageMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: pageId,
          meta: newPageMeta,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate)) {
      expect(response.data.pageUpdate.page).toBePage({
        contents: pageContents,
        id: pageId,
        name: pageName,
        path: relativePagePath,
      });
      expect(response.data.pageUpdate.page?.meta).toContain(newPageMeta);
    }

    expect.assertions(2);
  });

  it<UpdatePageContext>('returns validation errors when the page id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: 'anyId',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageUpdate))
      expect(response.data.pageUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "id": [
            "Invalid id",
            "The requested page id does not exist",
          ],
          "name": null,
        }
      `);

    expect.assertions(1);
  });

  it<UpdatePageContext>('returns validation errors when the page name is invalid', async ({
    server,
  }) => {
    const pageName = 'expedita';
    const relativePagePath = `./${pageName}${MARKDOWN_EXTENSION}`;
    const pageId = generateBase64String(relativePagePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePagePath), '', {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: pageId,
          name: '<',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageUpdate))
      expect(response.data.pageUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "id": [],
          "name": [
            "Invalid characters",
          ],
        }
      `);

    expect.assertions(1);
  });

  it('returns an unexpected error when pages dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: { input: { id: 'anyId' } },
    });

    expect(response.data.pageUpdate).toBeNull();
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
            "pageUpdate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

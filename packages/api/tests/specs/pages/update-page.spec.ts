import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  PagePayload,
  PageUpdateErrors,
  PageUpdatePayload,
} from '../../../src';
import type { Meta } from '../../../src/types';
import {
  EXCERPT_SEPARATOR,
  MARKDOWN_EXTENSION,
} from '../../../src/utils/constants';
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
      data: {
        pages: {
          baseUrl: '/pages',
          path: PAGES_FIXTURES_DIR,
        },
      },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it<UpdatePageContext>('can update a page without changes', async ({
    server,
  }) => {
    const name = 'quae';
    const contents = 'cupiditate magni accusantium';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate))
      expect(response.data.pageUpdate.page).toBePage({
        contents,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdatePageContext>('can update the name of a page', async ({ server }) => {
    const name = 'sed';
    const contents = 'est minus deleniti';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newName = 'voluptatem';
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id,
          name: newName,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate)) {
      expect(response.data.pageUpdate.page).toBePage({
        contents,
        name: newName,
      });
      expect(response.data.pageUpdate.page?.id).not.toBe(id);
    }

    expect.assertions(2);
  });

  it<UpdatePageContext>('can update the contents of a page', async ({
    server,
  }) => {
    const name = 'minima';
    const contents = 'in dolorem eaque';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newContents = 'sed debitis sint';
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id,
          contents: newContents,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate))
      expect(response.data.pageUpdate.page).toBePage({
        contents: newContents,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdatePageContext>('can update the excerpt of a page', async ({
    server,
  }) => {
    const name = 'officia';
    const excerpt = 'aut dignissimos ut';
    const relativePagePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePagePath);

    await writeFile(
      join(PAGES_FIXTURES_DIR, relativePagePath),
      `${excerpt}${EXCERPT_SEPARATOR}`,
      {
        encoding: 'utf8',
      }
    );

    const newExcerpt = 'voluptas aut cupiditate';
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id,
          excerpt: newExcerpt,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate))
      expect(response.data.pageUpdate.page).toBePage({
        excerpt: newExcerpt,
        id,
        name,
        path: relativePagePath,
      });

    expect.assertions(1);
  });

  it<UpdatePageContext>('can update the meta of a page', async ({ server }) => {
    const name = 'dolorem';
    const contents = 'voluptate ut quibusdam';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(PAGES_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id,
          meta: newMeta,
        },
      },
    });

    if (isPagePayload(response.data.pageUpdate)) {
      expect(response.data.pageUpdate.page).toBePage({
        contents,
        id,
        name,
        path: relativePath,
      });
      expect(response.data.pageUpdate.page?.meta).toContain(newMeta);
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
          "excerpt": null,
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
    const name = 'expedita';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;

    await writeFile(join(PAGES_FIXTURES_DIR, relativePath), '', {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updatePageMutation,
      variables: {
        input: {
          id: generateBase64String(relativePath),
          name: '<',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageUpdate))
      expect(response.data.pageUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "excerpt": null,
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

import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  Meta,
  PageCreateErrors,
  PageCreatePayload,
  PagePayload,
} from '../../../src/types';
import { expect } from '../../utils';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../utils/helpers';
import { createPageMutation } from './mutations';

const isPagePayload = (
  payload: Nullable<PageCreatePayload>
): payload is PagePayload =>
  isObject(payload) && isObjKeyExist(payload, 'page');

const isPageValidationErrors = (
  payload: Nullable<PageCreatePayload>
): payload is PageCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type CreatePageContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('create-page', () => {
  beforeEach<CreatePageContext>(async (context) => {
    context.server = await createAPIServer({
      data: {
        pages: {
          baseUrl: '/pages/',
          path: PAGES_FIXTURES_DIR,
        },
      },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it<CreatePageContext>('can create a new empty page', async ({ server }) => {
    const name = 'molestias';
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isPagePayload(response.data.pageCreate))
      expect(response.data.pageCreate.page).toBePage({
        contents: '',
        name,
      });

    expect.assertions(1);
  });

  it<CreatePageContext>('can create a new page with contents', async ({
    server,
  }) => {
    const name = 'omnis';
    const contents = 'corrupti dolores nesciunt';
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          contents,
          name,
        },
      },
    });

    if (isPagePayload(response.data.pageCreate)) {
      expect(response.data.pageCreate.page).toBePage({ contents, name });
      expect(
        response.data.pageCreate.page?.meta?.createdAt
      ).not.toBeUndefined();
    }

    expect.assertions(2);
  });

  it<CreatePageContext>('can create a new page with excerpt', async ({
    server,
  }) => {
    const name = 'fugiat';
    const excerpt = 'omnis voluptates commodi';
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          excerpt,
          name,
        },
      },
    });

    if (isPagePayload(response.data.pageCreate))
      expect(response.data.pageCreate.page).toBePage({ excerpt, name });

    expect.assertions(1);
  });

  it<CreatePageContext>('can create a new page with meta', async ({
    server,
  }) => {
    const name = 'aliquid';
    const meta: Meta = {
      status: 'draft',
      title: 'earum',
    };
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          meta,
          name,
        },
      },
    });

    if (isPagePayload(response.data.pageCreate)) {
      expect(response.data.pageCreate.page?.name).toBe(name);
      expect(response.data.pageCreate.page?.meta).toContain(meta);
    }

    expect.assertions(2);
  });

  it<CreatePageContext>('can create a new page with meta, excerpt and content', async ({
    server,
  }) => {
    const name = 'nisi';
    const contents = 'libero facilis adipisci';
    const excerpt = 'similique ut sint';
    const meta: Meta = {
      seoTitle: 'quia qui aut',
      title: 'sed',
    };
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          contents,
          excerpt,
          meta,
          name,
        },
      },
    });

    if (isPagePayload(response.data.pageCreate)) {
      expect(response.data.pageCreate.page).toBePage({
        contents,
        excerpt,
        name,
      });
      expect(response.data.pageCreate.page?.meta).toContain(meta);
    }

    expect.assertions(2);
  });

  it<CreatePageContext>('returns validation errors when name is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          name: '<',
        },
      },
    });

    if (isPageValidationErrors(response.data.pageCreate)) {
      expect(response.data.pageCreate.errors.contents).toBeNull();
      expect(response.data.pageCreate.errors.meta).toBeNull();
      expect(response.data.pageCreate.errors.name).toMatchInlineSnapshot(`
        [
          "Invalid characters",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(3);
  });

  it<CreatePageContext>('returns validation errors when page name exists', async ({
    server,
  }) => {
    const name = 'esse';
    await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          name,
        },
      },
    });
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isPageValidationErrors(response.data.pageCreate)) {
      expect(response.data.pageCreate.errors.contents).toBeNull();
      expect(response.data.pageCreate.errors.meta).toBeNull();
      expect(response.data.pageCreate.errors.name).toMatchInlineSnapshot(`
        [
          "Must be unique, esse already exists",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(3);
  });

  it('returns an unexpected error when pages dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: createPageMutation,
      variables: { input: { name: 'anyName' } },
    });

    expect(response.data.pageCreate).toBeNull();
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
            "pageCreate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

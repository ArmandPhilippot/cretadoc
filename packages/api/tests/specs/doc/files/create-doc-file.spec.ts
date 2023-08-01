import { mkdir } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocFileCreateErrors,
  DocFileCreatePayload,
  DocFilePayload,
  Meta,
} from '../../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../../src/utils/constants';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { createDocFileMutation } from './mutations';

const isDocFilePayload = (
  payload: Nullable<DocFileCreatePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileCreatePayload>
): payload is DocFileCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type CreateDocFileContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('create-doc-file', () => {
  beforeEach<CreateDocFileContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<CreateDocFileContext>('can create a new empty doc file', async ({
    server,
  }) => {
    const name = 'molestias';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate))
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents: '',
        name,
      });

    expect.assertions(1);
  });

  it<CreateDocFileContext>('can create a new doc file with contents', async ({
    server,
  }) => {
    const name = 'omnis';
    const contents = 'corrupti dolores nesciunt';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          contents,
          name,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file).toBeDocFile({ contents, name });
      expect(
        response.data.docFileCreate.file?.meta?.createdAt
      ).not.toBeUndefined();
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('can create a new doc file with excerpt', async ({
    server,
  }) => {
    const name = 'sed';
    const excerpt = 'ab deserunt iusto';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          excerpt,
          name,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate))
      expect(response.data.docFileCreate.file).toBeDocFile({ excerpt, name });

    expect.assertions(1);
  });

  it<CreateDocFileContext>('can create a new doc file with meta', async ({
    server,
  }) => {
    const name = 'aliquid';
    const meta: Meta = {
      status: 'draft',
      title: 'earum',
    };
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          meta,
          name,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file?.name).toBe(name);
      expect(response.data.docFileCreate.file?.meta).toContain(meta);
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('can create a new doc file with meta, excerpt and content', async ({
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
      query: createDocFileMutation,
      variables: {
        input: {
          contents,
          excerpt,
          meta,
          name,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents,
        excerpt,
        name,
      });
      expect(response.data.docFileCreate.file?.meta).toContain(meta);
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('can create a doc file in a subdirectory', async ({
    server,
  }) => {
    const dirName = 'quos';
    const dirPath = `./${dirName}`;

    await mkdir(join(DOC_FIXTURES_DIR, dirPath), { recursive: true });

    const name = 'ipsam';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name,
          parentPath: dirPath,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents: '',
        name,
        path: `${dirPath}/${name}${MARKDOWN_EXTENSION}`,
      });
      expect(response.data.docFileCreate.file?.parent?.name).toBe(dirName);
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('returns validation errors when name is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name: '<',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.errors.contents).toBeNull();
      expect(response.data.docFileCreate.errors.meta).toBeNull();
      expect(response.data.docFileCreate.errors.parentPath).toBeNull();
      expect(response.data.docFileCreate.errors.name).toMatchInlineSnapshot(`
        [
          "Invalid characters",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(4);
  });

  it<CreateDocFileContext>('returns validation errors when doc file name exists', async ({
    server,
  }) => {
    const name = 'esse';
    await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name,
        },
      },
    });
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.errors.contents).toBeNull();
      expect(response.data.docFileCreate.errors.meta).toBeNull();
      expect(response.data.docFileCreate.errors.parentPath).toBeNull();
      expect(response.data.docFileCreate.errors.name).toMatchInlineSnapshot(`
        [
          "File must be unique, esse already exists",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(4);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: { input: { name: 'anyName' } },
    });

    expect(response.data.docFileCreate).toBeNull();
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
            "docFileCreate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

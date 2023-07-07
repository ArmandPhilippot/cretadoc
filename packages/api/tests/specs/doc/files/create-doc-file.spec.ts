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
    const docFileName = 'molestias';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name: docFileName,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate))
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents: '',
        name: docFileName,
      });

    expect.assertions(1);
  });

  it<CreateDocFileContext>('can create a new doc file with contents', async ({
    server,
  }) => {
    const docFileName = 'omnis';
    const docFileContents = 'corrupti dolores nesciunt';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          contents: docFileContents,
          name: docFileName,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents: docFileContents,
        name: docFileName,
      });
      expect(
        response.data.docFileCreate.file?.meta?.createdAt
      ).not.toBeUndefined();
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('can create a new doc file with meta', async ({
    server,
  }) => {
    const docFileName = 'aliquid';
    const docFileMeta: Meta = {
      status: 'draft',
      title: 'earum',
    };
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          meta: docFileMeta,
          name: docFileName,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file?.name).toBe(docFileName);
      expect(response.data.docFileCreate.file?.meta).toContain(docFileMeta);
    }

    expect.assertions(2);
  });

  it<CreateDocFileContext>('can create a doc file in a subdirectory', async ({
    server,
  }) => {
    const docDirName = 'quos';
    const docDirPath = `./${docDirName}`;

    await mkdir(join(DOC_FIXTURES_DIR, docDirPath), { recursive: true });

    const docFileName = 'ipsam';
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name: docFileName,
          parentPath: docDirPath,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileCreate)) {
      expect(response.data.docFileCreate.file).toBeDocFile({
        contents: '',
        name: docFileName,
        path: `${docDirPath}/${docFileName}${MARKDOWN_EXTENSION}`,
      });
      expect(response.data.docFileCreate.file?.parent?.name).toBe(docDirName);
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
    const docFileName = 'esse';
    await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name: docFileName,
        },
      },
    });
    const response = await server.sendQuery({
      query: createDocFileMutation,
      variables: {
        input: {
          name: docFileName,
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

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocFileDeleteErrors,
  DocFileDeletePayload,
  DocFilePayload,
} from '../../../../src';
import { MARKDOWN_EXTENSION } from '../../../../src/utils/constants';
import { generateBase64String } from '../../../../src/utils/helpers';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { deleteDocFileMutation } from './mutations';

const isDocFilePayload = (
  payload: Nullable<DocFileDeletePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileDeletePayload>
): payload is DocFileDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type DeleteDocFileContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('delete-doc-file', () => {
  beforeEach<DeleteDocFileContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<DeleteDocFileContext>('can delete a doc file by id', async ({
    server,
  }) => {
    const docFileName = 'dolore';
    const docFileContents = 'illum id nemo';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativeDocFilePath),
      docFileContents,
      {
        encoding: 'utf8',
      }
    );

    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: {
        input: {
          id: docFileId,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileDelete))
      expect(response.data.docFileDelete.file).toBeDocFile({
        contents: docFileContents,
        id: docFileId,
        name: docFileName,
        path: relativeDocFilePath,
      });

    expect.assertions(1);
  });

  it<DeleteDocFileContext>('can delete a doc file by name', async ({
    server,
  }) => {
    const docFileName = 'assumenda';
    const docFileContents = 'minus cumque incidunt';
    const docFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;

    await writeFile(join(DOC_FIXTURES_DIR, docFilePath), docFileContents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: {
        input: {
          path: docFilePath,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileDelete))
      expect(response.data.docFileDelete.file).toBeDocFile({
        contents: docFileContents,
        name: docFileName,
        path: docFilePath,
      });

    expect.assertions(1);
  });

  it<DeleteDocFileContext>('returns validation errors when the doc file id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: {
        input: {
          id: 'anyInvalidId',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileDelete))
      expect(response.data.docFileDelete.errors).toMatchInlineSnapshot(`
        {
          "id": [
            "Invalid id",
            "The requested file does not exist",
          ],
          "path": null,
        }
      `);

    expect.assertions(1);
  });

  it<DeleteDocFileContext>('returns validation errors when the doc file path does not exist', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: {
        input: {
          path: 'anyInvalidPath',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileDelete))
      expect(response.data.docFileDelete.errors).toMatchInlineSnapshot(`
        {
          "id": null,
          "path": [
            "The requested file does not exist",
          ],
        }
      `);

    expect.assertions(1);
  });

  it<DeleteDocFileContext>('returns an error when input is missing either id or path', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocFileMutation,
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
              "expected": "Either an id or a path",
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
            "docFileDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it<DeleteDocFileContext>('returns an error when both id and path are provided in input', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: {
        input: {
          id: 'anyId',
          path: 'anyPath',
        },
      },
    });

    expect(response.errors).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "cretadoc": {
              "code": "BAD_USER_INPUT",
              "expected": "Either an id or a path",
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
            "docFileDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: deleteDocFileMutation,
      variables: { input: { path: 'anyPath' } },
    });

    expect(response.data.docFileDelete).toBeNull();
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
            "docFileDelete",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

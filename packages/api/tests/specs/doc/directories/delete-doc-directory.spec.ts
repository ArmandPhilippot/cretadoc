import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocDirectoryDeleteErrors,
  DocDirectoryDeletePayload,
  DocDirectoryPayload,
} from '../../../../src';
import { generateBase64String } from '../../../../src/utils/helpers';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { deleteDocDirectoryMutation } from './mutations';

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryDeletePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryDeletePayload>
): payload is DocDirectoryDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type DeleteDocDirectoryContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('delete-doc-directory', () => {
  beforeEach<DeleteDocDirectoryContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<DeleteDocDirectoryContext>('can delete a doc directory by id', async ({
    server,
  }) => {
    const docDirectoryName = 'dolore';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.directory).toBeDocDirectory({
        id: docDirectoryId,
        name: docDirectoryName,
        path: docDirectoryPath,
      });

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('can delete a doc directory by name', async ({
    server,
  }) => {
    const docDirectoryName = 'assumenda';
    const docDirectoryPath = `./${docDirectoryName}`;

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          path: docDirectoryPath,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.directory).toBeDocDirectory({
        name: docDirectoryName,
        path: docDirectoryPath,
      });

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('cannot delete a non-empty doc directory without being explicit', async ({
    server,
  }) => {
    const docDirectoryName = 'aut';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });
    await writeFile(
      join(DOC_FIXTURES_DIR, docDirectoryPath, './fugiat.md'),
      '',
      { encoding: 'utf8' }
    );

    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.errors).toMatchInlineSnapshot(`
        {
          "id": [
            "The directory must be empty",
          ],
          "onlyEmpty": [],
          "path": null,
        }
      `);

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('can delete a non-empty doc directory by being explicit', async ({
    server,
  }) => {
    const docDirectoryName = 'tenetur';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });
    await writeFile(join(DOC_FIXTURES_DIR, docDirectoryPath, './quia.md'), '', {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
          onlyEmpty: false,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.directory).toBeDocDirectory({
        id: docDirectoryId,
        name: docDirectoryName,
        path: docDirectoryPath,
      });

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('returns validation errors when the doc directory id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          id: 'anyInvalidId',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.errors).toMatchInlineSnapshot(`
        {
          "id": [
            "Invalid id",
            "The requested directory does not exist",
          ],
          "onlyEmpty": [],
          "path": null,
        }
      `);

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('returns validation errors when the doc directory path does not exist', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: {
        input: {
          path: 'anyInvalidPath',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryDelete))
      expect(response.data.docDirectoryDelete.errors).toMatchInlineSnapshot(`
        {
          "id": null,
          "onlyEmpty": [],
          "path": [
            "The requested directory does not exist",
          ],
        }
      `);

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('returns an error when input is missing either id or path', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
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
            "docDirectoryDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it<DeleteDocDirectoryContext>('returns an error when both id and path are provided in input', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
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
            "docDirectoryDelete",
          ],
        },
      ]
    `);

    expect.assertions(1);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: deleteDocDirectoryMutation,
      variables: { input: { path: 'anyPath' } },
    });

    expect(response.data.docDirectoryDelete).toBeNull();
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
            "docDirectoryDelete",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

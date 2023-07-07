import { mkdir } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocDirectoryPayload,
  DocDirectoryUpdateErrors,
  DocDirectoryUpdatePayload,
} from '../../../../src';
import type { Meta } from '../../../../src/types';
import { generateBase64String } from '../../../../src/utils/helpers';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { updateDocDirectoryMutation } from './mutations';

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryUpdatePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryUpdatePayload>
): payload is DocDirectoryUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type UpdateDocDirectoryContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('update-doc-directory', () => {
  beforeEach<UpdateDocDirectoryContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<UpdateDocDirectoryContext>('can update a doc directory without changes', async ({
    server,
  }) => {
    const docDirectoryName = 'quae';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id: docDirectoryId,
        name: docDirectoryName,
        path: docDirectoryPath,
      });

    expect.assertions(1);
  });

  it<UpdateDocDirectoryContext>('can update the name of a doc directory', async ({
    server,
  }) => {
    const docDirectoryName = 'sed';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const newDocDirectoryName = 'voluptatem';
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
          name: newDocDirectoryName,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        name: newDocDirectoryName,
      });
      expect(response.data.docDirectoryUpdate.directory?.id).not.toBe(
        docDirectoryId
      );
    }

    expect.assertions(2);
  });

  it<UpdateDocDirectoryContext>('can update the meta of a doc directory', async ({
    server,
  }) => {
    const docDirectoryName = 'dolorem';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const newDocDirectoryMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
          meta: newDocDirectoryMeta,
        },
      },
    });

    console.log(response.data);

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id: docDirectoryId,
        name: docDirectoryName,
        path: docDirectoryPath,
      });
      expect(response.data.docDirectoryUpdate.directory?.meta).toContain(
        newDocDirectoryMeta
      );
    }

    expect.assertions(2);
  });

  it<UpdateDocDirectoryContext>('can update the path of a doc directory', async ({
    server,
  }) => {
    const docDirectoryName = 'animi';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const newDocDirName = 'labore';
    const newDocDirPath = `./${newDocDirName}`;

    await mkdir(join(DOC_FIXTURES_DIR, newDocDirPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
          parentPath: newDocDirPath,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        name: docDirectoryName,
        path: `${newDocDirPath}/${docDirectoryName}`,
      });
      expect(response.data.docDirectoryUpdate.directory?.id).not.toBe(
        docDirectoryId
      );
    }

    expect.assertions(2);
  });

  it<UpdateDocDirectoryContext>('returns validation errors when the doc directory id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: 'anyId',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.errors).toMatchInlineSnapshot(`
        {
          "id": [
            "Invalid id",
            "The requested directory does not exist",
          ],
          "meta": null,
          "name": null,
          "parentPath": null,
        }
      `);

    expect.assertions(1);
  });

  it<UpdateDocDirectoryContext>('returns validation errors when the doc directory name is invalid', async ({
    server,
  }) => {
    const docDirectoryName = 'expedita';
    const docDirectoryPath = `./${docDirectoryName}`;
    const docDirectoryId = generateBase64String(docDirectoryPath);

    await mkdir(join(DOC_FIXTURES_DIR, docDirectoryPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: docDirectoryId,
          name: '<',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.errors).toMatchInlineSnapshot(`
        {
          "id": [],
          "meta": null,
          "name": [
            "Invalid characters",
          ],
          "parentPath": null,
        }
      `);

    expect.assertions(1);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: { input: { id: 'anyId' } },
    });

    expect(response.data.docDirectoryUpdate).toBeNull();
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
            "docDirectoryUpdate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

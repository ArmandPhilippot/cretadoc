import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocFilePayload,
  DocFileUpdateErrors,
  DocFileUpdatePayload,
} from '../../../../src';
import type { Meta } from '../../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../../src/utils/constants';
import { generateBase64String } from '../../../../src/utils/helpers';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { updateDocFileMutation } from './mutations';

const isDocFilePayload = (
  payload: Nullable<DocFileUpdatePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileUpdatePayload>
): payload is DocFileUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type UpdateDocFileContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

/* eslint-disable max-statements */
describe('update-doc-file', () => {
  beforeEach<UpdateDocFileContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<UpdateDocFileContext>('can update a doc file without changes', async ({
    server,
  }) => {
    const docFileName = 'quae';
    const docFileContents = 'cupiditate magni accusantium';
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
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: docFileContents,
        id: docFileId,
        name: docFileName,
        path: relativeDocFilePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('can update the name of a doc file', async ({
    server,
  }) => {
    const docFileName = 'sed';
    const docFileContents = 'est minus deleniti';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativeDocFilePath),
      docFileContents,
      {
        encoding: 'utf8',
      }
    );

    const newDocFileName = 'voluptatem';
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
          name: newDocFileName,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: docFileContents,
        name: newDocFileName,
      });
      expect(response.data.docFileUpdate.file?.id).not.toBe(docFileId);
    }

    expect.assertions(2);
  });

  it<UpdateDocFileContext>('can update the contents of a doc file', async ({
    server,
  }) => {
    const docFileName = 'minima';
    const docFileContents = 'in dolorem eaque';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativeDocFilePath),
      docFileContents,
      {
        encoding: 'utf8',
      }
    );

    const newDocFileContents = 'sed debitis sint';
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
          contents: newDocFileContents,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: newDocFileContents,
        id: docFileId,
        name: docFileName,
        path: relativeDocFilePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('can update the meta of a doc file', async ({
    server,
  }) => {
    const docFileName = 'dolorem';
    const docFileContents = 'voluptate ut quibusdam';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativeDocFilePath),
      docFileContents,
      {
        encoding: 'utf8',
      }
    );

    const newDocFileMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
          meta: newDocFileMeta,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: docFileContents,
        id: docFileId,
        name: docFileName,
        path: relativeDocFilePath,
      });
      expect(response.data.docFileUpdate.file?.meta).toContain(newDocFileMeta);
    }

    expect.assertions(2);
  });

  it<UpdateDocFileContext>('can update the path of a doc file', async ({
    server,
  }) => {
    const docFileName = 'animi';
    const docFileContents = 'dicta tempore dolor';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativeDocFilePath),
      docFileContents,
      {
        encoding: 'utf8',
      }
    );

    const docDirName = 'labore';
    const docDirPath = `./${docDirName}`;

    await mkdir(join(DOC_FIXTURES_DIR, docDirPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
          parentPath: docDirPath,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: docFileContents,
        name: docFileName,
        path: `${docDirPath}/${docFileName}${MARKDOWN_EXTENSION}`,
      });
      expect(response.data.docFileUpdate.file?.id).not.toBe(docFileId);
    }

    expect.assertions(2);
  });

  it<UpdateDocFileContext>('returns validation errors when the doc file id is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: 'anyId',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "id": [
            "Invalid id",
            "The requested doc file id does not exist",
          ],
          "name": null,
          "parentPath": null,
        }
      `);

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('returns validation errors when the doc file name is invalid', async ({
    server,
  }) => {
    const docFileName = 'expedita';
    const relativeDocFilePath = `./${docFileName}${MARKDOWN_EXTENSION}`;
    const docFileId = generateBase64String(relativeDocFilePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativeDocFilePath), '', {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: docFileId,
          name: '<',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "id": [],
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
      query: updateDocFileMutation,
      variables: { input: { id: 'anyId' } },
    });

    expect(response.data.docFileUpdate).toBeNull();
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
            "docFileUpdate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});
/* eslint-enable max-statements */

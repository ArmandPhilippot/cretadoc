import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocFilePayload,
  DocFileUpdateErrors,
  DocFileUpdatePayload,
} from '../../../../src';
import type { Meta } from '../../../../src/types';
import {
  EXCERPT_SEPARATOR,
  MARKDOWN_EXTENSION,
} from '../../../../src/utils/constants';
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
      data: {
        doc: {
          baseUrl: '/doc/',
          path: DOC_FIXTURES_DIR,
        },
      },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<UpdateDocFileContext>('can update a doc file without changes', async ({
    server,
  }) => {
    const name = 'quae';
    const contents = 'cupiditate magni accusantium';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('can update the name of a doc file', async ({
    server,
  }) => {
    const name = 'sed';
    const contents = 'est minus deleniti';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newName = 'voluptatem';
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
          name: newName,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents,
        name: newName,
      });
      expect(response.data.docFileUpdate.file?.id).not.toBe(id);
    }

    expect.assertions(2);
  });

  it<UpdateDocFileContext>('can update the contents of a doc file', async ({
    server,
  }) => {
    const name = 'minima';
    const contents = 'in dolorem eaque';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newContents = 'sed debitis sint';
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
          contents: newContents,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents: newContents,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('can update the excerpt of a doc file', async ({
    server,
  }) => {
    const name = 'aut';
    const excerpt = 'voluptas quo autem';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(
      join(DOC_FIXTURES_DIR, relativePath),
      `${excerpt}${EXCERPT_SEPARATOR}`,
      {
        encoding: 'utf8',
      }
    );

    const newExcerpt = 'voluptatem accusantium eaque';
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
          excerpt: newExcerpt,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.file).toBeDocFile({
        excerpt: newExcerpt,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocFileContext>('can update the meta of a doc file', async ({
    server,
  }) => {
    const name = 'dolorem';
    const contents = 'voluptate ut quibusdam';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const newMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
          meta: newMeta,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents,
        id,
        name,
        path: relativePath,
      });
      expect(response.data.docFileUpdate.file?.meta).toContain(newMeta);
    }

    expect.assertions(2);
  });

  it<UpdateDocFileContext>('can update the path of a doc file', async ({
    server,
  }) => {
    const name = 'animi';
    const contents = 'dicta tempore dolor';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;
    const id = generateBase64String(relativePath);

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), contents, {
      encoding: 'utf8',
    });

    const dirName = 'labore';
    const dirPath = `./${dirName}`;

    await mkdir(join(DOC_FIXTURES_DIR, dirPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id,
          parentPath: dirPath,
        },
      },
    });

    if (isDocFilePayload(response.data.docFileUpdate)) {
      expect(response.data.docFileUpdate.file).toBeDocFile({
        contents,
        name,
        path: `${dirPath}/${name}${MARKDOWN_EXTENSION}`,
      });
      expect(response.data.docFileUpdate.file?.id).not.toBe(id);
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
          "excerpt": null,
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
    const name = 'expedita';
    const relativePath = `./${name}${MARKDOWN_EXTENSION}`;

    await writeFile(join(DOC_FIXTURES_DIR, relativePath), '', {
      encoding: 'utf8',
    });

    const response = await server.sendQuery({
      query: updateDocFileMutation,
      variables: {
        input: {
          id: generateBase64String(relativePath),
          name: '<',
        },
      },
    });

    if (isDocFileValidationErrors(response.data.docFileUpdate))
      expect(response.data.docFileUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "excerpt": null,
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

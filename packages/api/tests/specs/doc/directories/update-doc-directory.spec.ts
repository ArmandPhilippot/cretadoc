import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocDirectoryPayload,
  DocDirectoryUpdateErrors,
  DocDirectoryUpdatePayload,
} from '../../../../src';
import type { Meta } from '../../../../src/types';
import {
  DIRECTORY_INDEX_FILENAME,
  EXCERPT_SEPARATOR,
  MARKDOWN_EXTENSION,
} from '../../../../src/utils/constants';
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

  it<UpdateDocDirectoryContext>('can update a doc directory without changes', async ({
    server,
  }) => {
    const name = 'quae';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocDirectoryContext>('can update the name of a doc directory', async ({
    server,
  }) => {
    const name = 'sed';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });

    const newName = 'voluptatem';
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
          name: newName,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        name: newName,
      });
      expect(response.data.docDirectoryUpdate.directory?.id).not.toBe(id);
    }

    expect.assertions(2);
  });

  it<UpdateDocDirectoryContext>('can update the contents of a doc directory', async ({
    server,
  }) => {
    const name = 'odit';
    const contents = 'voluptatem aut ex';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });
    await writeFile(
      join(
        DOC_FIXTURES_DIR,
        relativePath,
        `${DIRECTORY_INDEX_FILENAME}${MARKDOWN_EXTENSION}`
      ),
      contents,
      {
        encoding: 'utf8',
      }
    );

    const newContents = 'repellat quo quibusdam';
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
          contents: newContents,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        contents: newContents,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocDirectoryContext>('can update the excerpt of a doc directory', async ({
    server,
  }) => {
    const name = 'non';
    const excerpt = 'tempore facilis sed';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });
    await writeFile(
      join(
        DOC_FIXTURES_DIR,
        relativePath,
        `${DIRECTORY_INDEX_FILENAME}${MARKDOWN_EXTENSION}`
      ),
      `${excerpt}${EXCERPT_SEPARATOR}`,
      {
        encoding: 'utf8',
      }
    );

    const newExcerpt = 'et ut aliquid';
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
          excerpt: newExcerpt,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        excerpt: newExcerpt,
        id,
        name,
        path: relativePath,
      });

    expect.assertions(1);
  });

  it<UpdateDocDirectoryContext>('can update the meta of a doc directory', async ({
    server,
  }) => {
    const name = 'dolorem';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });

    const newMeta: Meta = {
      status: 'published',
      title: 'nobis similique doloremque',
    };
    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
          meta: newMeta,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id,
        name,
        path: relativePath,
      });
      expect(response.data.docDirectoryUpdate.directory?.meta).toContain(
        newMeta
      );
    }

    expect.assertions(2);
  });

  it<UpdateDocDirectoryContext>('can update the path of a doc directory', async ({
    server,
  }) => {
    const name = 'animi';
    const relativePath = `./${name}`;
    const id = generateBase64String(relativePath);

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });

    const newName = 'labore';
    const newPath = `./${newName}`;

    await mkdir(join(DOC_FIXTURES_DIR, newPath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id,
          parentPath: newPath,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryUpdate)) {
      expect(response.data.docDirectoryUpdate.directory).toBeDocDirectory({
        name,
        path: `${newPath}/${name}`,
      });
      expect(response.data.docDirectoryUpdate.directory?.id).not.toBe(id);
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
          "contents": null,
          "excerpt": null,
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
    const name = 'expedita';
    const relativePath = `./${name}`;

    await mkdir(join(DOC_FIXTURES_DIR, relativePath), { recursive: true });

    const response = await server.sendQuery({
      query: updateDocDirectoryMutation,
      variables: {
        input: {
          id: generateBase64String(relativePath),
          name: '<',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryUpdate))
      expect(response.data.docDirectoryUpdate.errors).toMatchInlineSnapshot(`
        {
          "contents": null,
          "excerpt": null,
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

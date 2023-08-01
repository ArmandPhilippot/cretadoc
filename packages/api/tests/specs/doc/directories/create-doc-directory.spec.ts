import { mkdir } from 'fs/promises';
import { join } from 'path';
import { type Nullable, isObjKeyExist, isObject } from '@cretadoc/utils';
import { afterAll, beforeEach, describe, it } from 'vitest';
import type {
  DocDirectoryCreateErrors,
  DocDirectoryCreatePayload,
  DocDirectoryPayload,
  Meta,
} from '../../../../src/types';
import { expect } from '../../../utils';
import { DOC_FIXTURES_DIR } from '../../../utils/constants';
import { createAPIServer, deleteFixturesIn } from '../../../utils/helpers';
import { createDocDirectoryMutation } from './mutations';

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryCreatePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryCreatePayload>
): payload is DocDirectoryCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

type CreateDocDirectoryContext = {
  server: Awaited<ReturnType<typeof createAPIServer>>;
};

describe('create-doc-directory', () => {
  beforeEach<CreateDocDirectoryContext>(async (context) => {
    context.server = await createAPIServer({
      data: { doc: DOC_FIXTURES_DIR },
    });
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it<CreateDocDirectoryContext>('can create a new doc directory', async ({
    server,
  }) => {
    const name = 'molestias';
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryCreate))
      expect(response.data.docDirectoryCreate.directory).toBeDocDirectory({
        name,
      });

    expect.assertions(1);
  });

  it<CreateDocDirectoryContext>('can create a new doc directory with contents', async ({
    server,
  }) => {
    const name = 'quasi';
    const contents = 'numquam qui totam';
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          contents,
          name,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryCreate)) {
      expect(response.data.docDirectoryCreate.directory).toBeDocDirectory({
        contents,
        name,
      });
      expect(
        response.data.docDirectoryCreate.directory?.meta?.createdAt
      ).not.toBeUndefined();
    }

    expect.assertions(2);
  });

  it<CreateDocDirectoryContext>('can create a new doc directory with excerpt', async ({
    server,
  }) => {
    const name = 'sint';
    const excerpt = 'voluptatum molestiae quo';
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          excerpt,
          name,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryCreate))
      expect(response.data.docDirectoryCreate.directory).toBeDocDirectory({
        excerpt,
        name,
      });

    expect.assertions(1);
  });

  it<CreateDocDirectoryContext>('can create a new doc directory with meta', async ({
    server,
  }) => {
    const name = 'aliquid';
    const meta: Meta = {
      status: 'draft',
      title: 'earum',
    };
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          meta,
          name,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryCreate)) {
      expect(response.data.docDirectoryCreate.directory?.name).toBe(name);
      expect(response.data.docDirectoryCreate.directory?.meta).toContain(meta);
    }

    expect.assertions(2);
  });

  it<CreateDocDirectoryContext>('can create a doc directory in a subdirectory', async ({
    server,
  }) => {
    const parentName = 'quos';
    const parentPath = `./${parentName}`;

    await mkdir(join(DOC_FIXTURES_DIR, parentPath), { recursive: true });

    const name = 'ipsam';
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          name,
          parentPath,
        },
      },
    });

    if (isDocDirectoryPayload(response.data.docDirectoryCreate)) {
      expect(response.data.docDirectoryCreate.directory).toBeDocDirectory({
        name,
        path: `${parentPath}/${name}`,
      });
      expect(response.data.docDirectoryCreate.directory?.parent?.name).toBe(
        parentName
      );
    }

    expect.assertions(2);
  });

  it<CreateDocDirectoryContext>('returns validation errors when name is invalid', async ({
    server,
  }) => {
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          name: '<',
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryCreate)) {
      expect(response.data.docDirectoryCreate.errors.meta).toBeNull();
      expect(response.data.docDirectoryCreate.errors.parentPath).toBeNull();
      expect(response.data.docDirectoryCreate.errors.name)
        .toMatchInlineSnapshot(`
        [
          "Invalid characters",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(3);
  });

  it<CreateDocDirectoryContext>('returns validation errors when doc directory name exists', async ({
    server,
  }) => {
    const name = 'esse';
    await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          name,
        },
      },
    });
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: {
        input: {
          name,
        },
      },
    });

    if (isDocDirectoryValidationErrors(response.data.docDirectoryCreate)) {
      expect(response.data.docDirectoryCreate.errors.meta).toBeNull();
      expect(response.data.docDirectoryCreate.errors.parentPath).toBeNull();
      expect(response.data.docDirectoryCreate.errors.name)
        .toMatchInlineSnapshot(`
        [
          "Directory name must be unique, esse already exist",
        ]
      `);
    }

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect.assertions(3);
  });

  it('returns an unexpected error when doc dir is not provided', async () => {
    const server = await createAPIServer();
    const response = await server.sendQuery({
      query: createDocDirectoryMutation,
      variables: { input: { name: 'anyName' } },
    });

    expect(response.data.docDirectoryCreate).toBeNull();
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
            "docDirectoryCreate",
          ],
        },
      ]
    `);

    expect.assertions(2);
  });
});

/* eslint-disable max-statements */
import { basename, join } from 'path';
import {
  isObject,
  isObjKeyExist,
  slugify,
  type Nullable,
} from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  DocDirectoryPayload,
  DocDirectoryUpdateErrors,
  DocDirectoryUpdatePayload,
  DocDirectoryUpdateResult,
} from '../../../src/types';
import { generateBase64String } from '../../../src/utils/helpers';
import { docDirectories, docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  createFixtures,
  deleteFixturesIn,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { docDirectoryUpdate } from './doc-directories.mutations';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = await createAPIServer({ port: 3270 });

const updateDocDirectory = async (
  variables?: Variables[typeof docDirectoryUpdate]
) => sendQuery({ api: api.instance, query: docDirectoryUpdate, variables });

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryUpdatePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryUpdatePayload>
): payload is DocDirectoryUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('updateDocDirectory', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('can update a documentation directory without changing name and path', async () => {
    const existingDocDirectory = docDirectories[0];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await updateDocDirectory({
      input: { id: existingDocDirectory.id },
    });

    expect(response.body.data.docDirectoryUpdate).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryUpdate))
      expect(response.body.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id: existingDocDirectory.id,
        name: existingDocDirectory.name,
        parent: existingDocDirectory.parent,
        path: existingDocDirectory.path,
        slug: existingDocDirectory.slug,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('can update the name of a documentation directory', async () => {
    const existingDocDirectory = docDirectories[0];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const newDocDirectoryName = 'quo';
    const basePath = existingDocDirectory.parent
      ? existingDocDirectory.parent.path
      : '.';
    const newDocDirectoryPath = `${basePath}/${newDocDirectoryName}`;
    const response = await updateDocDirectory({
      input: {
        id: existingDocDirectory.id,
        name: newDocDirectoryName,
        parentPath: existingDocDirectory.parent?.path,
      },
    });

    expect(response.body.data.docDirectoryUpdate).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryUpdate))
      expect(response.body.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id: generateBase64String(newDocDirectoryPath),
        name: newDocDirectoryName,
        parent: existingDocDirectory.parent,
        path: newDocDirectoryPath,
        slug: `/${slugify(newDocDirectoryName)}`,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('can update the path of a documentation directory', async () => {
    const existingDocDirectory = docDirectories[1];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    // An existing directory path.
    const parentPath = './autem';
    const newPath = `./${join(parentPath, existingDocDirectory.path)}`;
    const response = await updateDocDirectory({
      input: {
        id: existingDocDirectory.id,
        parentPath,
      },
    });

    expect(response.body.data.docDirectoryUpdate).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryUpdate))
      expect(response.body.data.docDirectoryUpdate.directory).toBeDocDirectory({
        id: generateBase64String(newPath),
        name: existingDocDirectory.name,
        parent: {
          id: generateBase64String(parentPath),
          name: basename(parentPath),
          path: parentPath,
          slug: `/${slugify(basename(parentPath))}`,
        },
        path: newPath,
        slug: existingDocDirectory.slug,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const existingDocDirectory = docDirectories[2];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await updateDocDirectory({
      input: { id: existingDocDirectory.id, name: '>' },
    });

    expect(response.body.data.docDirectoryUpdate).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryUpdate)) {
      expect(response.body.data.docDirectoryUpdate.errors.id).toStrictEqual([]);
      expect(
        response.body.data.docDirectoryUpdate.errors.name?.length
      ).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'sed dolores ut';
    const response = await updateDocDirectory({ input: { id: invalidId } });

    expect(response.body.data.docDirectoryUpdate).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryUpdate)) {
      expect(
        response.body.data.docDirectoryUpdate.errors.id?.length
      ).toBeTruthy();
      expect(response.body.data.docDirectoryUpdate.errors.name).toBeNull();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docDirectoryUpdate,
      variables: { input: { id: 'anyIdSinceErrorIsExpected' } },
    });

    expect(response.body.data.docDirectoryUpdate).toBeNull();
    const body =
      response.body as QueryResultWithErrors<DocDirectoryUpdateResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

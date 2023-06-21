/* eslint-disable max-statements */
import {
  isObject,
  isObjKeyExist,
  slugify,
  type Nullable,
} from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  DocDirectoryDeleteErrors,
  DocDirectoryDeletePayload,
  DocDirectoryDeleteResult,
  DocDirectoryPayload,
} from '../../../src/types';
import { API_ERROR_CODE } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
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
import { docDirectories } from './doc-directories.fixtures';
import {
  docDirectoryCreate,
  docDirectoryDelete,
} from './doc-directories.mutations';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3230,
});

const misconfiguredAPI = await createAPIServer({ port: 3280 });

const deleteDocDirectory = async (
  variables?: Variables[typeof docDirectoryDelete]
) => sendQuery({ api: api.instance, query: docDirectoryDelete, variables });

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryDeletePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryDeletePayload>
): payload is DocDirectoryDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('docDirectoryDelete', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('cannot delete a non-empty doc directory without option', async () => {
    const existingDocDirectory = docDirectories[0];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocDirectory({
      input: { id: existingDocDirectory.id },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryDelete))
      expect(
        response.body.data.docDirectoryDelete.errors.id?.length
      ).toBeTruthy();

    expect.assertions(2);
  });

  it('can delete an empty doc directory without option', async () => {
    const dirName = 'empty-dir';
    const dirPath = `./${dirName}`;
    await sendQuery({
      api: api.instance,
      query: docDirectoryCreate,
      variables: { input: { name: dirName } },
    });

    const response = await deleteDocDirectory({
      input: { path: dirPath },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryDelete))
      expect(response.body.data.docDirectoryDelete.directory).toBeDocDirectory({
        id: generateBase64String(dirPath),
        name: dirName,
        parent: null,
        path: dirPath,
        slug: `/${slugify(dirName)}`,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('can delete a non-empty doc directory by id with option', async () => {
    const existingDocDirectory = docDirectories[0];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocDirectory({
      input: { id: existingDocDirectory.id, onlyEmpty: false },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryDelete))
      expect(response.body.data.docDirectoryDelete.directory).toBeDocDirectory({
        id: existingDocDirectory.id,
        name: existingDocDirectory.name,
        parent: existingDocDirectory.parent,
        path: existingDocDirectory.path,
        slug: existingDocDirectory.slug,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('can delete a non-empty doc directory by path with option', async () => {
    const existingDocDirectory = docDirectories[1];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocDirectory({
      input: { path: existingDocDirectory.path, onlyEmpty: false },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryDelete))
      expect(response.body.data.docDirectoryDelete.directory).toBeDocDirectory({
        id: existingDocDirectory.id,
        name: existingDocDirectory.name,
        parent: existingDocDirectory.parent,
        path: existingDocDirectory.path,
        slug: existingDocDirectory.slug,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('returns validation errors when the directory does not exist', async () => {
    // A previously deleted directory.
    const existingDocDirectory = docDirectories[1];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocDirectory({
      input: { path: existingDocDirectory.path },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryDelete)) {
      expect(response.body.data.docDirectoryDelete.errors.id).toBeNull();
      expect(
        response.body.data.docDirectoryDelete.errors.path?.length
      ).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'est';
    const response = await deleteDocDirectory({
      input: { id: invalidId },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryDelete)) {
      expect(response.body.data.docDirectoryDelete.errors.path).toBeNull();
      expect(
        response.body.data.docDirectoryDelete.errors.id?.length
      ).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the path is invalid', async () => {
    const invalidPath = 'anyNonExistentPath';
    const response = await deleteDocDirectory({
      input: { path: invalidPath },
    });

    expect(response.body.data.docDirectoryDelete).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryDelete)) {
      expect(response.body.data.docDirectoryDelete.errors.id).toBeNull();
      expect(
        response.body.data.docDirectoryDelete.errors.path?.length
      ).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await deleteDocDirectory({ input: {} });

    expect(response.body.data.docDirectoryDelete).toBeNull();
    const body =
      response.body as QueryResultWithErrors<DocDirectoryDeleteResult>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await deleteDocDirectory({
      input: { id: 'anyId', path: 'anyPath' },
    });

    expect(response.body.data.docDirectoryDelete).toBeNull();
    const body =
      response.body as QueryResultWithErrors<DocDirectoryDeleteResult>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docDirectoryDelete,
      variables: { input: { path: 'anyPathSinceErrorIsExpected' } },
    });

    expect(response.body.data.docDirectoryDelete).toBeNull();
    const body =
      response.body as QueryResultWithErrors<DocDirectoryDeleteResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

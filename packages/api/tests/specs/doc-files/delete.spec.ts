import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  DocFileDeleteErrors,
  DocFileDeletePayload,
  DocFileDeleteResult,
  DocFilePayload,
} from '../../../src/types';
import { API_ERROR_CODE } from '../../../src/utils/constants';
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
import { docFiles } from './doc-files.fixtures';
import { docFileDelete } from './doc-files.mutations';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3230,
});

const misconfiguredAPI = await createAPIServer({ port: 3280 });

const deleteDocFile = async (variables?: Variables[typeof docFileDelete]) =>
  sendQuery({ api: api.instance, query: docFileDelete, variables });

const isDocFilePayload = (
  payload: Nullable<DocFileDeletePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileDeletePayload>
): payload is DocFileDeleteErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('docFileDelete', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('can delete a documentation file by id', async () => {
    const existingDocFile = docFiles[0];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocFile({ input: { id: existingDocFile.id } });

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileDelete))
      expect(response.body.data.docFileDelete.file).toBeDocFile({
        contents: existingDocFile.contents,
        id: existingDocFile.id,
        name: existingDocFile.name,
        parent: existingDocFile.parent,
        path: existingDocFile.path,
        slug: existingDocFile.slug,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('can delete a documentation file by path', async () => {
    const existingDocFile = docFiles[1];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocFile({
      input: { path: existingDocFile.path },
    });

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileDelete))
      expect(response.body.data.docFileDelete.file).toBeDocFile({
        contents: existingDocFile.contents,
        id: existingDocFile.id,
        name: existingDocFile.name,
        parent: existingDocFile.parent,
        path: existingDocFile.path,
        slug: existingDocFile.slug,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('returns validation errors when the file does not exist', async () => {
    // A previously deleted file.
    const existingDocFile = docFiles[1];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const response = await deleteDocFile({
      input: { path: existingDocFile.path },
    });

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileDelete)) {
      expect(response.body.data.docFileDelete.errors.id).toBeNull();
      expect(response.body.data.docFileDelete.errors.path?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'est';
    const response = await deleteDocFile({
      input: { id: invalidId },
    });

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileDelete)) {
      expect(response.body.data.docFileDelete.errors.path).toBeNull();
      expect(response.body.data.docFileDelete.errors.id?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the path is invalid', async () => {
    const invalidPath = 'anyNonExistentPath';
    const response = await deleteDocFile({
      input: { path: invalidPath },
    });

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileDelete)) {
      expect(response.body.data.docFileDelete.errors.id).toBeNull();
      expect(response.body.data.docFileDelete.errors.path?.length).toBeTruthy();
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await deleteDocFile({ input: {} });

    expect(response.body.data.docFileDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileDeleteResult>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await deleteDocFile({
      input: { id: 'anyId', path: 'anyPath' },
    });

    expect(response.body.data.docFileDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileDeleteResult>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docFileDelete,
      variables: { input: { path: 'anyPathSinceErrorIsExpected' } },
    });

    expect(response.body.data.docFileDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileDeleteResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

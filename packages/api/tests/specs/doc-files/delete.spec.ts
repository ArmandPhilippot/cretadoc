import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type {
  DocFileDeleteErrors,
  DocFileDeletePayload,
  DocFileDeleteResult,
  DocFilePayload,
} from 'src/types';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { error } from '../../../src/utils/errors/messages';
import { docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  cleanFixtures,
  createAPIServer,
  createFixtures,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { docFiles } from './doc-files.fixtures';
import { docFileDelete } from './doc-files.mutations';

const api = createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3230,
});

const misconfiguredAPI = createAPIServer({ port: 3280 });

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
    await cleanFixtures(DOC_FIXTURES_DIR);
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
    const expectedErrors = [error.validation.missing('file')];

    expect(response.body.data.docFileDelete).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileDelete)) {
      expect(response.body.data.docFileDelete.errors.id).toBeNull();
      expect(response.body.data.docFileDelete.errors.path).toStrictEqual(
        expectedErrors
      );
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
      expect(response.body.data.docFileDelete.errors.id).toContain(
        error.validation.format.id
      );
      expect(response.body.data.docFileDelete.errors.id).toContain(
        error.validation.missing('file')
      );
    }

    const assertionsCount = 4;
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
      expect(response.body.data.docFileDelete.errors.path).toContain(
        error.validation.format.path
      );
      expect(response.body.data.docFileDelete.errors.path).toContain(
        error.validation.missing('file')
      );
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await deleteDocFile({ input: {} });

    expect(response.body.data.docFileDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileDeleteResult>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await deleteDocFile({
      input: { id: 'anyId', path: 'anyPath' },
    });

    expect(response.body.data.docFileDelete).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileDeleteResult>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.invalid.input,
    });
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
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.mutator('Documentation'),
    });
  });
});

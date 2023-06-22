/* eslint-disable max-statements */
import {
  isObject,
  isObjKeyExist,
  slugify,
  type Nullable,
} from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  DocFilePayload,
  DocFileUpdateErrors,
  DocFileUpdatePayload,
  DocFileUpdateResult,
} from '../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { docFiles, docFixtures } from '../../fixtures/doc';
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
import { docFileUpdate } from './doc-files.mutations';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = await createAPIServer({ port: 3270 });

const updateDocFile = async (variables?: Variables[typeof docFileUpdate]) =>
  sendQuery({ api: api.instance, query: docFileUpdate, variables });

const isDocFilePayload = (
  payload: Nullable<DocFileUpdatePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileUpdatePayload>
): payload is DocFileUpdateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('updateDocFile', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('can update a documentation file without changing name and content', async () => {
    const existingDocFile = docFiles[0];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const response = await updateDocFile({ input: { id: existingDocFile.id } });

    expect(response.body.data.docFileUpdate).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileUpdate))
      expect(response.body.data.docFileUpdate.file).toBeDocFile({
        contents: existingDocFile.contents,
        id: existingDocFile.id,
        name: existingDocFile.name,
        parent: null,
        path: existingDocFile.path,
        slug: existingDocFile.slug,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('can update the name of a documentation file', async () => {
    const existingDocFile = docFiles[0];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const newDocFileName = 'facere';
    const newDocFilePath = `./${newDocFileName}${MARKDOWN_EXTENSION}`;
    const response = await updateDocFile({
      input: {
        id: existingDocFile.id,
        name: newDocFileName,
        parentPath: existingDocFile.parent?.path,
      },
    });

    expect(response.body.data.docFileUpdate).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileUpdate))
      expect(response.body.data.docFileUpdate.file).toBeDocFile({
        contents: existingDocFile.contents,
        id: generateBase64String(newDocFilePath),
        name: newDocFileName,
        parent: null,
        path: newDocFilePath,
        slug: `/${slugify(newDocFileName)}`,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('can update the content of a documentation file', async () => {
    const existingDocFile = docFiles[1];

    if (!existingDocFile)
      throw new Error('Documentation fixtures are missing.');

    const newDocFileContents =
      'Esse pariatur tenetur. Deserunt et unde ut magnam officia rem doloremque optio non. Qui amet doloremque adipisci aliquam dicta in nulla sint. Fugit velit facilis impedit et.';
    const response = await updateDocFile({
      input: {
        id: existingDocFile.id,
        contents: newDocFileContents,
        parentPath: existingDocFile.parent?.path,
      },
    });

    expect(response.body.data.docFileUpdate).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileUpdate))
      expect(response.body.data.docFileUpdate.file).toBeDocFile({
        contents: newDocFileContents,
        id: existingDocFile.id,
        name: existingDocFile.name,
        parent: existingDocFile.parent,
        path: existingDocFile.path,
        slug: existingDocFile.slug,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const existingDocFile = docFiles[2];

    if (!existingDocFile) throw new Error('DocFiles fixtures are missing.');

    const response = await updateDocFile({
      input: { id: existingDocFile.id, name: '>' },
    });

    expect(response.body.data.docFileUpdate).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileUpdate)) {
      expect(response.body.data.docFileUpdate.errors.contents).toBeNull();
      expect(response.body.data.docFileUpdate.errors.id).toStrictEqual([]);
      expect(response.body.data.docFileUpdate.errors.name).toBeTruthy();
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the id is invalid', async () => {
    const invalidId = 'sed dolores ut';
    const response = await updateDocFile({ input: { id: invalidId } });

    expect(response.body.data.docFileUpdate).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileUpdate)) {
      expect(response.body.data.docFileUpdate.errors.contents).toBeNull();
      expect(response.body.data.docFileUpdate.errors.id?.length).toBeTruthy();
      expect(response.body.data.docFileUpdate.errors.name).toBeNull();
    }

    const assertionsCount = 4;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docFileUpdate,
      variables: { input: { id: 'anyIdSinceErrorIsExpected' } },
    });

    expect(response.body.data.docFileUpdate).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileUpdateResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

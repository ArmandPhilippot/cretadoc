import { isObject, isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type {
  DocFileCreateErrors,
  DocFileCreatePayload,
  DocFileCreateResult,
  DocFilePayload,
} from 'src/types';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { error } from '../../../src/utils/errors/messages';
import { generateBase64String } from '../../../src/utils/helpers';
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
import { docFileCreate } from './doc-files.mutations';

const api = createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = createAPIServer({ port: 3270 });

const createDocFile = async (variables?: Variables[typeof docFileCreate]) =>
  sendQuery({ api: api.instance, query: docFileCreate, variables });

const isDocFilePayload = (
  payload: Nullable<DocFileCreatePayload>
): payload is DocFilePayload =>
  isObject(payload) && isObjKeyExist(payload, 'file');

const isDocFileValidationErrors = (
  payload: Nullable<DocFileCreatePayload>
): payload is DocFileCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('docFileCreate', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(DOC_FIXTURES_DIR);
  });

  it('can create a new doc file without content', async () => {
    const newDocFileName = 'odio';
    const newDocFilePath = `./${newDocFileName}${MARKDOWN_EXTENSION}`;
    const response = await createDocFile({ input: { name: newDocFileName } });

    expect(response.body.data.docFileCreate).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileCreate))
      expect(response.body.data.docFileCreate.file).toBeDocFile({
        content: '',
        id: generateBase64String(newDocFilePath),
        name: newDocFileName,
        parent: null,
        path: newDocFilePath,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('can create a new doc file with content', async () => {
    const newDocFileContent =
      'Error impedit voluptates veritatis minima. Quasi ut rem iusto soluta corporis expedita earum consectetur quis. Est porro quia qui nobis repellat dicta quis. Explicabo harum odit veniam harum expedita est temporibus. Optio molestias doloribus et asperiores officia aperiam enim. Et dolor placeat.';
    const newDocFileName = 'impedit';
    const newDocFilePath = `./${newDocFileName}${MARKDOWN_EXTENSION}`;
    const response = await createDocFile({
      input: { name: newDocFileName, content: newDocFileContent },
    });

    expect(response.body.data.docFileCreate).not.toBeNull();

    if (isDocFilePayload(response.body.data.docFileCreate))
      expect(response.body.data.docFileCreate.file).toBeDocFile({
        content: newDocFileContent,
        id: generateBase64String(newDocFilePath),
        name: newDocFileName,
        parent: null,
        path: newDocFilePath,
        type: 'file',
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const forbiddenChar = '<';
    const expectedErrors = [error.validation.file.name];
    const response = await createDocFile({ input: { name: forbiddenChar } });

    expect(response.body.data.docFileCreate).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileCreate)) {
      expect(response.body.data.docFileCreate.errors.content).toBeNull();
      expect(response.body.data.docFileCreate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when name is too long', async () => {
    const pageName =
      'Voluptas aut ipsum quaerat est officia non sapiente eos. Aut rerum ipsum qui. Cupiditate inventore rerum eos aut amet ut. Ducimus aspernatur necessitatibus pariatur sed consequatur. Similique ad qui repudiandae qui inventore eum quod sapiente. Quis odit amet voluptate omnis aliquam eum similique nihil. Dolorum id qui earum modi et suscipit voluptates et. Cumque minima illo voluptates perferendis recusandae. Vel cupiditate odio. Et excepturi ea eum blanditiis aut.';
    const expectedErrors = [
      error.validation.string.length({ max: 255, min: 1 }),
    ];
    const response = await createDocFile({ input: { name: pageName } });

    expect(response.body.data.docFileCreate).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileCreate)) {
      expect(response.body.data.docFileCreate.errors.content).toBeNull();
      expect(response.body.data.docFileCreate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns validation errors when the name is already taken', async () => {
    const existingDocFile = docFiles[0];

    if (!existingDocFile) throw new Error('DocFiles fixtures are missing.');

    const expectedErrors = [error.validation.existent('file')];
    const response = await createDocFile({
      input: { name: existingDocFile.name },
    });

    expect(response.body.data.docFileCreate).not.toBeNull();

    if (isDocFileValidationErrors(response.body.data.docFileCreate)) {
      expect(response.body.data.docFileCreate.errors.content).toBeNull();
      expect(response.body.data.docFileCreate.errors.name).toStrictEqual(
        expectedErrors
      );
    }

    const assertionsCount = 3;
    expect.assertions(assertionsCount);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docFileCreate,
      variables: { input: { name: 'anyNameSinceErrorIsExpected' } },
    });

    expect(response.body.data.docFileCreate).toBeNull();
    const body = response.body as QueryResultWithErrors<DocFileCreateResult>;
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.mutator('Documentation'),
    });
  });
});

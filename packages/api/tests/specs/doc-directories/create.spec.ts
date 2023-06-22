import {
  isObject,
  isObjKeyExist,
  slugify,
  type Nullable,
} from '@cretadoc/utils';
import { afterAll, beforeAll, describe, it } from 'vitest';
import type {
  DocDirectoryCreateErrors,
  DocDirectoryCreatePayload,
  DocDirectoryCreateResult,
  DocDirectoryPayload,
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
import { docDirectoryCreate } from './doc-directories.mutations';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3220,
});

const misconfiguredAPI = await createAPIServer({ port: 3270 });

const createDocDirectory = async (
  variables?: Variables[typeof docDirectoryCreate]
) => sendQuery({ api: api.instance, query: docDirectoryCreate, variables });

const isDocDirectoryPayload = (
  payload: Nullable<DocDirectoryCreatePayload>
): payload is DocDirectoryPayload =>
  isObject(payload) && isObjKeyExist(payload, 'directory');

const isDocDirectoryValidationErrors = (
  payload: Nullable<DocDirectoryCreatePayload>
): payload is DocDirectoryCreateErrors =>
  isObject(payload) && isObjKeyExist(payload, 'errors');

describe('docDirectoryCreate', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('can create a new doc directory in root directory', async () => {
    const newDocDirectoryName = 'new-dir';
    const newDocDirectoryPath = `./${newDocDirectoryName}`;
    const response = await createDocDirectory({
      input: { name: newDocDirectoryName },
    });

    expect(response.body.data.docDirectoryCreate).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryCreate))
      expect(response.body.data.docDirectoryCreate.directory).toBeDocDirectory({
        id: generateBase64String(newDocDirectoryPath),
        name: newDocDirectoryName,
        parent: null,
        path: newDocDirectoryPath,
        slug: `/${slugify(newDocDirectoryName)}`,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('can create a new doc directory in a subdirectory', async () => {
    const parent = docDirectories[0];

    if (!parent) throw new Error('Documentation fixtures are missing.');

    const newDocDirectoryName = 'sunt';
    const newDocDirectoryPath = `${parent.path}/${newDocDirectoryName}`;
    const response = await createDocDirectory({
      input: { name: newDocDirectoryName, parentPath: parent.path },
    });

    expect(response.body.data.docDirectoryCreate).not.toBeNull();

    if (isDocDirectoryPayload(response.body.data.docDirectoryCreate))
      expect(response.body.data.docDirectoryCreate.directory).toBeDocDirectory({
        id: generateBase64String(newDocDirectoryPath),
        name: newDocDirectoryName,
        parent: {
          id: parent.id,
          name: parent.name,
          path: parent.path,
          slug: `/${slugify(parent.name)}`,
        },
        path: newDocDirectoryPath,
        slug: `/${slugify(newDocDirectoryName)}`,
        type: 'directory',
      });

    expect.assertions(2);
  });

  it('returns validation errors when name uses forbidden characters', async () => {
    const response = await createDocDirectory({
      input: { name: '<' },
    });

    expect(response.body.data.docDirectoryCreate).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryCreate))
      expect(
        response.body.data.docDirectoryCreate.errors.name?.length
      ).toBeTruthy();

    expect.assertions(2);
  });

  it('returns validation errors when name is too long', async () => {
    const pageName =
      'Voluptas aut ipsum quaerat est officia non sapiente eos. Aut rerum ipsum qui. Cupiditate inventore rerum eos aut amet ut. Ducimus aspernatur necessitatibus pariatur sed consequatur. Similique ad qui repudiandae qui inventore eum quod sapiente. Quis odit amet voluptate omnis aliquam eum similique nihil. Dolorum id qui earum modi et suscipit voluptates et. Cumque minima illo voluptates perferendis recusandae. Vel cupiditate odio. Et excepturi ea eum blanditiis aut.';
    const response = await createDocDirectory({ input: { name: pageName } });

    expect(response.body.data.docDirectoryCreate).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryCreate))
      expect(
        response.body.data.docDirectoryCreate.errors.name?.length
      ).toBeTruthy();

    expect.assertions(2);
  });

  it('returns validation errors when the name is already taken', async () => {
    const existingDocDirectory = docDirectories[0];

    if (!existingDocDirectory)
      throw new Error('Documentation fixtures are missing.');

    const response = await createDocDirectory({
      input: {
        name: existingDocDirectory.name,
        parentPath: existingDocDirectory.parent?.path,
      },
    });

    expect(response.body.data.docDirectoryCreate).not.toBeNull();

    if (isDocDirectoryValidationErrors(response.body.data.docDirectoryCreate))
      expect(
        response.body.data.docDirectoryCreate.errors.name?.length
      ).toBeTruthy();

    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docDirectoryCreate,
      variables: { input: { name: 'anyNameSinceErrorIsExpected' } },
    });

    expect(response.body.data.docDirectoryCreate).toBeNull();
    const body =
      response.body as QueryResultWithErrors<DocDirectoryCreateResult>;
    expect(body.errors.length).toBeTruthy();
  });
});

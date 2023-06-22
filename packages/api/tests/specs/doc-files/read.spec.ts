import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { API_ERROR_CODE } from '../../../src/utils/constants';
import { docFiles, docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { createFixtures, deleteFixturesIn } from '../../utils/helpers/fixtures';
import { docFileQuery } from './doc-files.queries';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3200,
});

const misconfiguredAPI = await createAPIServer({ port: 3250 });

const sendDocFileQuery = async (variables?: Variables[typeof docFileQuery]) =>
  sendQuery({ api: api.instance, query: docFileQuery, variables });

describe('docFile', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('returns a documentation file by id', async () => {
    const firstFile = docFiles[0];

    if (!firstFile) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocFileQuery({ id: firstFile.id });

    expect(response.body.data).not.toBeNull();
    expect(response.body.data.doc?.file).toBeDocFile(firstFile);
    expect.assertions(2);
  });

  it('returns a documentation file by path', async () => {
    const firstFile = docFiles[0];

    if (!firstFile) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocFileQuery({ path: firstFile.path });

    expect(response.body.data.doc?.file).not.toBeNull();
    expect(response.body.data.doc?.file).toBeDocFile(firstFile);
    expect.assertions(2);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await sendDocFileQuery();

    expect(response.body.data.doc?.file).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await sendDocFileQuery({ id: 'anyId', path: 'anyPath' });

    expect(response.body.data.doc?.file).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docFileQuery,
      variables: { path: 'anyPathSinceErrorIsExpected' },
    });

    expect(response.body.data.doc?.file).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

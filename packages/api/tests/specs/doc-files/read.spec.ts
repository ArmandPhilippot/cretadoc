/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { error } from '../../../src/utils/errors/messages';
import { docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { cleanFixtures, createFixtures } from '../../utils/helpers/fixtures';
import { docFiles } from './doc-files.fixtures';
import { docFileQuery } from './doc-files.queries';

const api = createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3200,
});

const misconfiguredAPI = createAPIServer({ port: 3250 });

const sendDocFileQuery = async (variables?: Variables[typeof docFileQuery]) =>
  sendQuery({ api: api.instance, query: docFileQuery, variables });

describe('docFile', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(DOC_FIXTURES_DIR);
  });

  it('returns a documentation file by id', async () => {
    const firstFile = docFiles[0];

    if (!firstFile) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocFileQuery({ id: firstFile.id });

    expect(response.body.data).not.toBeNull();
    expect(response.body.data.doc?.file).toBeDocEntry(firstFile);
    expect.assertions(2);
  });

  it('returns a documentation file by path', async () => {
    const firstFile = docFiles[0];

    if (!firstFile) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocFileQuery({ path: firstFile.path });

    expect(response.body.data.doc?.file).not.toBeNull();
    expect(response.body.data.doc?.file).toBePage(firstFile);
    expect.assertions(2);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await sendDocFileQuery();

    expect(response.body.data.doc?.file).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await sendDocFileQuery({ id: 'anyId', path: 'anyPath' });

    expect(response.body.data.doc?.file).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.invalid.input,
    });
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
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.loader('Documentation'),
    });
  });
});

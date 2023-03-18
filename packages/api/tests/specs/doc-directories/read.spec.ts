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
import { docDirectories } from './doc-directories.fixtures';
import { docDirectoryQuery } from './doc-directories.queries';

const api = createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3200,
});

const misconfiguredAPI = createAPIServer({ port: 3250 });

const sendDocDirectoryQuery = async (
  variables?: Variables[typeof docDirectoryQuery]
) => sendQuery({ api: api.instance, query: docDirectoryQuery, variables });

describe('docDirectory', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await cleanFixtures(DOC_FIXTURES_DIR);
  });

  it('returns a documentation directory by id', async () => {
    const firstDirectory = docDirectories[0];

    if (!firstDirectory) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocDirectoryQuery({ id: firstDirectory.id });

    expect(response.body.data).not.toBeNull();
    expect(response.body.data.doc?.directory).toBeDocDirectory(firstDirectory);
    expect.assertions(2);
  });

  it('returns a documentation directory by path', async () => {
    const firstDirectory = docDirectories[0];

    if (!firstDirectory) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocDirectoryQuery({ path: firstDirectory.path });

    expect(response.body.data.doc?.directory).not.toBeNull();
    expect(response.body.data.doc?.directory).toBeDocDirectory(firstDirectory);
    expect.assertions(2);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await sendDocDirectoryQuery();

    expect(response.body.data.doc?.directory).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainException({
      code: 'BAD_USER_INPUT',
      message: error.missing.input,
    });
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await sendDocDirectoryQuery({
      id: 'anyId',
      path: 'anyPath',
    });

    expect(response.body.data.doc?.directory).toBeNull();
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
      query: docDirectoryQuery,
      variables: { path: 'anyPathSinceErrorIsExpected' },
    });

    expect(response.body.data.doc?.directory).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainException({
      code: 'BAD_CONFIGURATION',
      message: error.missing.loader('Documentation'),
    });
  });
});
import { afterAll, beforeAll, describe, it } from 'vitest';
import type { DocPayload } from '../../../src/types';
import { API_ERROR_CODE } from '../../../src/utils/constants';
import { docEntries, docFixtures } from '../../fixtures/doc';
import type { QueryResultWithErrors } from '../../types';
import { expect } from '../../utils';
import { DOC_FIXTURES_DIR } from '../../utils/constants';
import {
  createAPIServer,
  sendQuery,
  type Variables,
} from '../../utils/helpers';
import { createFixtures, deleteFixturesIn } from '../../utils/helpers/fixtures';
import { docEntryQuery } from './doc-entries.queries';

const api = await createAPIServer({
  data: { doc: DOC_FIXTURES_DIR },
  port: 3200,
});

const misconfiguredAPI = await createAPIServer({ port: 3250 });

const sendDocEntryQuery = async (variables?: Variables[typeof docEntryQuery]) =>
  sendQuery({ api: api.instance, query: docEntryQuery, variables });

describe('docEntry', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
    api.start();
  });

  afterAll(async () => {
    api.stop();
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('returns a documentation entry by id', async () => {
    const firstEntry = docEntries[0];

    if (!firstEntry) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocEntryQuery({ id: firstEntry.id });

    expect(response.body.data).not.toBeNull();
    expect(response.body.data.doc?.entry).toBeDocEntry(firstEntry);
    expect.assertions(2);
  });

  it('returns a documentation entry by path', async () => {
    const lastEntry = docEntries[docEntries.length - 1];

    if (!lastEntry) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocEntryQuery({ path: lastEntry.path });

    expect(response.body.data.doc?.entry).not.toBeNull();
    expect(response.body.data.doc?.entry).toBeDocEntry(lastEntry);
    expect.assertions(2);
  });

  it('returns a documentation entry by slug', async () => {
    const lastEntry = docEntries[docEntries.length - 1];

    if (!lastEntry) throw new Error('Documentation fixtures are missing.');

    const response = await sendDocEntryQuery({ slug: lastEntry.slug });

    expect(response.body.data.doc?.entry).not.toBeNull();
    expect(response.body.data.doc?.entry).toBeDocEntry(lastEntry);
    expect.assertions(2);
  });

  it('returns an error if both id and path are missing', async () => {
    const response = await sendDocEntryQuery();

    expect(response.body.data.doc?.entry).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error if both id and path are given', async () => {
    const response = await sendDocEntryQuery({ id: 'anyId', path: 'anyPath' });

    expect(response.body.data.doc?.entry).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors).toContainErrorCode(API_ERROR_CODE.BAD_USER_INPUT);
    expect.assertions(2);
  });

  it('returns an error when API is misconfigured', async () => {
    const response = await sendQuery({
      api: misconfiguredAPI.instance,
      query: docEntryQuery,
      variables: { path: 'anyPathSinceErrorIsExpected' },
    });

    expect(response.body.data.doc?.entry).toBeNull();
    const body = response.body as QueryResultWithErrors<DocPayload>;
    expect(body.errors.length).toBeTruthy();
  });
});

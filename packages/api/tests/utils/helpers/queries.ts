import request from 'supertest';
import type { APIInstance } from '../../../src';
import type { Page, PagePayload, QueryInput } from '../../../src/types';
import type { QueryResult } from '../../../src/types/gql';
import { DEFAULT_ENDPOINT } from '../../../src/utils/constants';
import { pageQuery } from '../../specs/pages/pages.queries';
import type { QueryResultWithErrors } from '../../types';

export const queries = [pageQuery] as const;

export type Queries = (typeof queries)[number];

export type Variables = {
  [pageQuery]: QueryInput<Page>;
};

export type Result = {
  [pageQuery]: PagePayload;
};

export type SendQueryProps<Q extends Queries> = {
  api: APIInstance;
  endpoint?: string;
  query: Q;
  variables?: Variables[Q];
};

type SuperTestResponse<T> = Omit<request.Response, 'body'> & { body: T };

export const sendQuery = async <Q extends Queries>({
  api,
  query,
  endpoint,
  variables,
}: SendQueryProps<Q>): Promise<
  SuperTestResponse<QueryResult<Result[Q]> | QueryResultWithErrors<Result[Q]>>
> =>
  request(api)
    .post(endpoint ?? DEFAULT_ENDPOINT)
    .send({ query, variables });

import request from 'supertest';
import type { APIInstance } from '../../../src';
import type {
  ConnectionInput,
  DocDirectory,
  DocFile,
  DocPayload,
  Page,
  PageConnectionPayload,
  PageCreateInput,
  PageCreateResult,
  PageDeleteInput,
  PageDeleteResult,
  PagePayload,
  PageUpdateInput,
  PageUpdateResult,
  QueryInput,
} from '../../../src/types';
import type { QueryResult } from '../../../src/types/gql';
import { DEFAULT_ENDPOINT } from '../../../src/utils/constants';
import {
  docDirectoriesQuery,
  docDirectoryQuery,
} from '../../specs/doc-directories/doc-directories.queries';
import {
  docFileQuery,
  docFilesQuery,
} from '../../specs/doc-files/doc-files.queries';
import {
  pageCreate,
  pageDelete,
  pageUpdate,
} from '../../specs/pages/pages.mutations';
import { pageQuery, pagesQuery } from '../../specs/pages/pages.queries';
import type { QueryResultWithErrors } from '../../types';

export const mutations = [pageCreate, pageDelete, pageUpdate] as const;

export type Mutations = (typeof mutations)[number];

export const queries = [
  docDirectoryQuery,
  docDirectoriesQuery,
  docFileQuery,
  docFilesQuery,
  pageQuery,
  pagesQuery,
] as const;

export type Queries = (typeof queries)[number];

export type Variables = {
  [docDirectoryQuery]: QueryInput<DocDirectory>;
  [docDirectoriesQuery]: ConnectionInput<DocDirectory>;
  [docFileQuery]: QueryInput<DocFile>;
  [docFilesQuery]: ConnectionInput<DocFile>;
  [pageCreate]: PageCreateInput;
  [pageDelete]: PageDeleteInput;
  [pageUpdate]: PageUpdateInput;
  [pageQuery]: QueryInput<Page>;
  [pagesQuery]: ConnectionInput<Page>;
};

export type Result = {
  [docDirectoryQuery]: DocPayload;
  [docDirectoriesQuery]: DocPayload;
  [docFileQuery]: DocPayload;
  [docFilesQuery]: DocPayload;
  [pageCreate]: PageCreateResult;
  [pageDelete]: PageDeleteResult;
  [pageUpdate]: PageUpdateResult;
  [pageQuery]: PagePayload;
  [pagesQuery]: PageConnectionPayload;
};

export type SendQueryProps<Q extends Mutations | Queries> = {
  api: APIInstance;
  endpoint?: string;
  query: Q;
  variables?: Variables[Q];
};

type SuperTestResponse<T> = Omit<request.Response, 'body'> & { body: T };

export const sendQuery = async <Q extends Mutations | Queries>({
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

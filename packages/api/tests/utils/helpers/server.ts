import { createServer, type Server } from 'http';
import type { Nullable } from '@cretadoc/utils';
import type { GraphQLError } from 'graphql';
import request from 'supertest';
import {
  type APIConfig,
  type ConnectionInput,
  createAPI,
  type Page,
  type PageConnectionPayload,
  type PagePayload,
  type QueryInput,
  type QueryResult,
  type PageCreateInput,
  type PageDeleteInput,
  type PageUpdateInput,
  type PageCreateResult,
  type PageDeleteResult,
  type PageUpdateResult,
  type DocFileCreateInput,
  type DocFileDeleteInput,
  type DocFileUpdateInput,
  type DocFile,
  type DocFileCreateResult,
  type DocFileDeleteResult,
  type DocFileUpdateResult,
  type DocPayload,
  type DocDirectory,
  type DocDirectoryCreateInput,
  type DocDirectoryDeleteInput,
  type DocDirectoryUpdateInput,
  type DocDirectoryCreateResult,
  type DocDirectoryDeleteResult,
  type DocDirectoryUpdateResult,
  type DocEntry,
} from '../../../src';
import {
  createDocDirectoryMutation,
  deleteDocDirectoryMutation,
  updateDocDirectoryMutation,
} from '../../specs/doc/directories/mutations';
import {
  getDocDirectoriesListQuery,
  getDocDirectoryQuery,
} from '../../specs/doc/directories/queries';
import {
  getDocEntriesListQuery,
  getDocEntryQuery,
} from '../../specs/doc/entries/queries';
import {
  createDocFileMutation,
  deleteDocFileMutation,
  updateDocFileMutation,
} from '../../specs/doc/files/mutations';
import {
  getDocFileQuery,
  getDocFilesListQuery,
} from '../../specs/doc/files/queries';
import {
  createPageMutation,
  deletePageMutation,
  updatePageMutation,
} from '../../specs/pages/mutations';
import { getPageQuery, getPagesListQuery } from '../../specs/pages/queries';

export type CreateAPIServerConfig = Pick<
  Partial<APIConfig>,
  'data' | 'endpoint'
> & {
  hostname?: string;
  port?: number;
};

export type CreateAPIServerOptions = {
  isVerbose?: boolean;
};

export const initServer = async (
  config?: CreateAPIServerConfig,
  options?: CreateAPIServerOptions
) => {
  const { data, endpoint, hostname = 'localhost', port = 3100 } = config ?? {};
  const { isVerbose = false } = options ?? {};
  const api = await createAPI({ data, endpoint });
  const server = createServer((req, res) => {
    void (async () => {
      await api(req, res);
    })();
  });
  const url = `http://${hostname}:${port}`;
  let serverInstance: Nullable<Server> = null;

  const start = () => {
    serverInstance = server.listen(port, () => {
      if (isVerbose) console.log(`[api]: Server is running.`);
      console.log(`[api]: API is available at ${url}${api.graphqlEndpoint}`);
    });
  };

  const stop = () => {
    if (!serverInstance) {
      if (isVerbose)
        console.log('[server]: Server is not initialized. Cannot stop it.');
      return;
    }

    serverInstance.close((error) => {
      if (error) console.error(error);
      console.log('[server]: Server is stopped.');
    });
  };

  return { api, server: { start, stop }, url };
};

export type GraphQLErrors = {
  errors: GraphQLError[];
};

const mutations = [
  createDocDirectoryMutation,
  deleteDocDirectoryMutation,
  updateDocDirectoryMutation,
  createDocFileMutation,
  deleteDocFileMutation,
  updateDocFileMutation,
  createPageMutation,
  deletePageMutation,
  updatePageMutation,
] as const;

type Mutations = (typeof mutations)[number];

const queries = [
  getDocDirectoryQuery,
  getDocDirectoriesListQuery,
  getDocEntryQuery,
  getDocEntriesListQuery,
  getDocFileQuery,
  getDocFilesListQuery,
  getPageQuery,
  getPagesListQuery,
] as const;

type Queries = (typeof queries)[number];

export type Variables = {
  [getDocDirectoryQuery]: QueryInput<DocDirectory>;
  [getDocDirectoriesListQuery]: ConnectionInput<DocDirectory>;
  [createDocDirectoryMutation]: DocDirectoryCreateInput;
  [deleteDocDirectoryMutation]: DocDirectoryDeleteInput;
  [updateDocDirectoryMutation]: DocDirectoryUpdateInput;
  [getDocEntryQuery]: QueryInput<DocEntry>;
  [getDocEntriesListQuery]: ConnectionInput<DocEntry>;
  [getDocFileQuery]: QueryInput<DocFile>;
  [getDocFilesListQuery]: ConnectionInput<DocFile>;
  [createDocFileMutation]: DocFileCreateInput;
  [deleteDocFileMutation]: DocFileDeleteInput;
  [updateDocFileMutation]: DocFileUpdateInput;
  [getPageQuery]: QueryInput<Page>;
  [getPagesListQuery]: ConnectionInput<Page>;
  [createPageMutation]: PageCreateInput;
  [deletePageMutation]: PageDeleteInput;
  [updatePageMutation]: PageUpdateInput;
};

export type Result = {
  [getDocDirectoryQuery]: DocPayload;
  [getDocDirectoriesListQuery]: DocPayload;
  [createDocDirectoryMutation]: DocDirectoryCreateResult;
  [deleteDocDirectoryMutation]: DocDirectoryDeleteResult;
  [updateDocDirectoryMutation]: DocDirectoryUpdateResult;
  [getDocEntryQuery]: DocPayload;
  [getDocEntriesListQuery]: DocPayload;
  [getDocFileQuery]: DocPayload;
  [getDocFilesListQuery]: DocPayload;
  [createDocFileMutation]: DocFileCreateResult;
  [deleteDocFileMutation]: DocFileDeleteResult;
  [updateDocFileMutation]: DocFileUpdateResult;
  [getPageQuery]: PagePayload;
  [getPagesListQuery]: PageConnectionPayload;
  [createPageMutation]: PageCreateResult;
  [deletePageMutation]: PageDeleteResult;
  [updatePageMutation]: PageUpdateResult;
};

export type SendQueryProps<Q extends Mutations | Queries> = {
  query: Q;
  variables?: Variables[Q];
};

type SendQueryResponse<T> = QueryResult<T> & Partial<GraphQLErrors>;

export const createAPIServer = async (
  config?: CreateAPIServerConfig,
  options?: CreateAPIServerOptions
) => {
  const { api, server } = await initServer(config, options);

  return {
    sendQuery: async <Q extends Mutations | Queries>({
      query,
      variables,
    }: SendQueryProps<Q>): Promise<SendQueryResponse<Result[Q]>> => {
      server.start();

      return request(api)
        .post(api.graphqlEndpoint)
        .send({ query, variables })
        .then((response) => {
          server.stop();
          return response.body as SendQueryResponse<Result[Q]>;
        });
    },
  };
};

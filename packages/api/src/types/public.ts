import type { YogaServerInstance } from 'graphql-yoga';
import type { API_ERROR_CODE } from 'src/utils/constants';
import type { APIContext, ServerContext } from './contexts';

/**
 * Configure the data sources.
 */
export type APIDataConfig = {
  /**
   * The path of the pages directory.
   * @default undefined
   */
  pages?: string;
};

export type APIConfig = {
  /**
   * The data configuration.
   * @default undefined
   */
  data?: APIDataConfig;
  /**
   * The API endpoint.
   * @default "/graphql"
   */
  endpoint: string;
  /**
   * Enable GraphiQL.
   * @default true
   */
  graphiql: boolean;
};

export type APIInstance = YogaServerInstance<ServerContext, APIContext>;

export type APIErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE];

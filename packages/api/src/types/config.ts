import type { Maybe } from '@cretadoc/utils';
import type { YogaServerInstance } from 'graphql-yoga';
import type { APIContext, ServerContext } from './internals';

export type DataDirectoryConfig = {
  /**
   * The base url used for relative assets and links in markdown files.
   */
  baseUrl: string;
  /**
   * The absolute path.
   */
  path: string;
};

/**
 * Configure the data sources.
 */
export type APIDataConfig = {
  /**
   * The documentation directory configuration.
   * @default undefined
   */
  doc?: DataDirectoryConfig;
  /**
   * The pages directory configuration.
   * @default undefined
   */
  pages?: DataDirectoryConfig;
};

export type APIConfig = {
  /**
   * The data configuration.
   * @default undefined
   */
  data: Maybe<APIDataConfig>;
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

import type { Maybe } from '@cretadoc/utils';
import type { YogaServerInstance } from 'graphql-yoga';
import type { APIContext, ServerContext } from './internals';

/**
 * Configure the data sources.
 */
export type APIDataConfig = {
  /**
   * The path of the documentation directory.
   * @default undefined
   */
  doc?: string;
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

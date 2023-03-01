import type { YogaServerInstance } from 'graphql-yoga';
import type { APIContext, ServerContext } from './contexts';

export type APIConfig = {
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

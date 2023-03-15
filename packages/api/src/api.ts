import type { PartialDeep } from '@cretadoc/utils';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { PagesRepository } from './schema/pages/pages.repository';
import { initLoaders } from './schema/schema.loaders';
import { initMutators } from './schema/schema.mutators';
import type {
  APIConfig,
  APIContext,
  APIDataConfig,
  APIInstance,
} from './types';
import { DEFAULT_ENDPOINT, DEFAULT_GRAPHIQL } from './utils/constants';

/**
 * Retrieve the default APIConfig object.
 *
 * @returns {APIConfig} The default configuration.
 */
const getDefaultConfig = (): APIConfig => {
  return {
    endpoint: DEFAULT_ENDPOINT,
    graphiql: DEFAULT_GRAPHIQL,
  };
};

/**
 * Merge the consumer configuration with the default configuration.
 *
 * @param {PartialDeep<APIConfig> | undefined} config - The consumer config.
 * @returns {APIConfig} The full configuration.
 */
const mergeConfigWithDefaults = (
  config: PartialDeep<APIConfig> | undefined
): APIConfig => {
  const defaultConfig = getDefaultConfig();

  if (!config) return defaultConfig;

  return {
    endpoint: config.endpoint ?? defaultConfig.endpoint,
    graphiql: config.graphiql ?? defaultConfig.graphiql,
  };
};

/**
 * Create the API context.
 *
 * @param {APIDataConfig} data - The data configuration object.
 * @returns {APIContext} The GraphQL context.
 */
const initContext = ({ pages }: APIDataConfig): APIContext => {
  const pagesRepository = pages ? new PagesRepository(pages) : undefined;

  const loaders = initLoaders({
    pages: pagesRepository,
  });

  const mutators = initMutators({
    pages: pagesRepository,
  });

  return {
    loaders,
    mutators,
  };
};

/**
 * Create an instance of the API.
 *
 * @param {PartialDeep<APIConfig>} [config] - An API configuration object.
 * @returns {APIInstance} The API instance.
 */
export const createAPI = (config?: PartialDeep<APIConfig>): APIInstance => {
  const mergedConfig = mergeConfigWithDefaults(config);
  const context = initContext({ ...config?.data });

  return createYoga({
    context,
    graphiql: mergedConfig.graphiql,
    graphqlEndpoint: mergedConfig.endpoint,
    schema,
  });
};

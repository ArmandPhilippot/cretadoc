import type { PartialDeep } from '@cretadoc/utils';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import type { APIConfig, APIInstance } from './types';
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
 * Create an instance of the API.
 *
 * @param {PartialDeep<APIConfig>} [config] - An API configuration object.
 * @returns {APIInstance} The API instance.
 */
export const createAPI = (config?: PartialDeep<APIConfig>): APIInstance => {
  const mergedConfig = mergeConfigWithDefaults(config);

  return createYoga({
    graphiql: mergedConfig.graphiql,
    graphqlEndpoint: mergedConfig.endpoint,
    schema,
  });
};

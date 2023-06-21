import type { PartialDeep } from '@cretadoc/utils';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { DocRepository } from './schema/doc/doc.repository';
import { PagesRepository } from './schema/pages/pages.repository';
import { initLoaders } from './schema/schema.loaders';
import { initMutators } from './schema/schema.mutators';
import type {
  APIConfig,
  APIContext,
  APIDataConfig,
  APIInstance,
} from './types';
import { mergeDefaultConfigWith } from './utils/helpers';

/**
 * Create the API context.
 *
 * @param {APIDataConfig} data - The data configuration object.
 * @returns {APIContext} The GraphQL context.
 */
const initContext = ({ doc, pages }: APIDataConfig): APIContext => {
  const docRepository = doc ? new DocRepository(doc) : undefined;
  const pagesRepository = pages ? new PagesRepository(pages) : undefined;

  const loaders = initLoaders({
    doc: docRepository,
    pages: pagesRepository,
  });

  const mutators = initMutators({
    doc: docRepository,
    pages: pagesRepository,
  });

  return {
    loaders,
    mutators,
  };
};

type CreateAPI = (config?: PartialDeep<APIConfig>) => Promise<APIInstance>;

/**
 * Create an instance of the API.
 *
 * @param {PartialDeep<APIConfig>} [config] - An API configuration object.
 * @returns {Promise<APIInstance>} The API instance.
 */
export const createAPI: CreateAPI = async (
  config?: PartialDeep<APIConfig>
): Promise<APIInstance> => {
  const mergedConfig = await mergeDefaultConfigWith(config);
  const context = initContext({ ...config?.data });

  return createYoga({
    context,
    graphiql: mergedConfig.graphiql,
    graphqlEndpoint: mergedConfig.endpoint,
    schema,
  });
};

import { createYoga } from 'graphql-yoga';
import { DocRepository, PagesRepository } from './repositories';
import { schema } from './schema';
import { initLoaders } from './schema/schema.loaders';
import { initMutators } from './schema/schema.mutators';
import type {
  APIConfig,
  APIContext,
  APIDataConfig,
  APIInstance,
} from './types';
import { mergeConfig } from './utils/helpers';

/**
 * Create the API context.
 *
 * @param {APIDataConfig} data - The data configuration object.
 * @returns {APIContext} The GraphQL context.
 */
const initContext = ({ doc, pages }: APIDataConfig): APIContext => {
  const docRepository = doc
    ? new DocRepository(doc.path, doc.baseUrl)
    : undefined;
  const pagesRepository = pages
    ? new PagesRepository(pages.path, pages.baseUrl)
    : undefined;

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

type CreateAPI = (config?: Partial<APIConfig>) => Promise<APIInstance>;

/**
 * Create an instance of the API.
 *
 * @param {Partial<APIConfig>} [config] - An API configuration object.
 * @returns {Promise<APIInstance>} The API instance.
 */
export const createAPI: CreateAPI = async (
  config?: Partial<APIConfig>
): Promise<APIInstance> => {
  const { data, endpoint, graphiql } = await mergeConfig(config);
  const context = initContext({ ...data });

  return createYoga({
    context,
    graphiql,
    graphqlEndpoint: endpoint,
    schema,
  });
};

import type { PagesRepository } from '../../repositories';
import type { ListInput, Page, PageInput, PageLoaders } from '../../types';
import { listPages } from './list/list.loaders';
import { getPageById, getPageByName, getPageBySlug } from './read/read.loaders';

/**
 * Initialize the page loaders.
 *
 * @param {PageRepository} repository - The Page repository.
 * @returns {PageLoaders} The page loaders.
 */
export const initPageLoaders = (repository: PagesRepository): PageLoaders => {
  return {
    page: {
      byId: getPageById(repository),
      byName: getPageByName(repository),
      bySlug: getPageBySlug(repository),
      list: async (params: ListInput<Page>) => listPages(repository, params),
    },
  };
};

/**
 * Clear the page loaders.
 *
 * @param {NonNullable<PageLoaders['page']>} pageLoaders - The page loaders.
 * @param {PageInput} input - The page id and name.
 */
export const clearPageLoaders = (
  pageLoaders: NonNullable<PageLoaders['page']>,
  { id, name }: PageInput
) => {
  pageLoaders.byId.clear(id);
  pageLoaders.byName.clear(name);
};

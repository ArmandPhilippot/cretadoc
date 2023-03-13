import type { ListInput, Page, PageLoaders } from '../../types';
import { listPages } from './list/list.loaders';
import type { PagesRepository } from './pages.repository';
import { getPageById, getPageByName } from './read/read.loaders';

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
      list: async (params: ListInput<Page>) => listPages(repository, params),
    },
  };
};

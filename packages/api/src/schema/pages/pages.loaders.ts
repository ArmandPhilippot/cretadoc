import type { PagesRepository } from '../../repositories';
import type { ListInput, Page, PageInput, PageLoaders } from '../../types';
import { loadPagesList } from './list';
import { loadPageById, loadPageByName, loadPageBySlug } from './read';

/**
 * Initialize the page loaders.
 *
 * @param {PageRepository} repository - The Page repository.
 * @returns {PageLoaders} The page loaders.
 */
export const initPageLoaders = (repository: PagesRepository): PageLoaders => {
  return {
    page: {
      byId: loadPageById(repository),
      byName: loadPageByName(repository),
      bySlug: loadPageBySlug(repository),
      list: async (params: ListInput<Page>) =>
        loadPagesList(repository, params),
    },
  };
};

/**
 * Clear the page loaders.
 *
 * @param {NonNullable<PageLoaders['page']>} pageLoaders - The page loaders.
 * @param {PageInput} input - The page id, name and slug.
 */
export const clearPageLoaders = (
  pageLoaders: NonNullable<PageLoaders['page']>,
  { id, name, slug }: PageInput
) => {
  pageLoaders.byId.clear(id);
  pageLoaders.byName.clear(name);
  pageLoaders.bySlug.clear(slug);
};

import type { PageMutators } from '../../types';
import { createPage } from './create/create.mutator';
import { deletePage } from './delete/delete.mutator';
import type { PagesRepository } from './pages.repository';
import { updatePage } from './update/update.mutator';

/**
 * Initialize the pages mutators.
 *
 * @param {string} repository - The page repository.
 * @returns {PageMutators} The page mutators.
 */
export const initPageMutators = (repository: PagesRepository): PageMutators => {
  return {
    page: {
      create: async (data) => createPage(repository, data),
      del: async (data) => deletePage(repository, data),
      update: async (data) => updatePage(repository, data),
    },
  };
};

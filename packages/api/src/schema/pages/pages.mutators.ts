import type { PageMutators } from '../../types';
import { createPage } from './create/create.mutator';
import type { PagesRepository } from './pages.repository';

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
    },
  };
};

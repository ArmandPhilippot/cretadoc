import type { PagesRepository } from '../../repositories';
import type { PageMutators } from '../../types';
import { createPage } from './create';
import { deletePage } from './delete';
import { updatePage } from './update';

/**
 * Initialize the pages mutators.
 *
 * @param {PagesRepository} repository - The page repository.
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

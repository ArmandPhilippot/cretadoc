import type { PagesRepository } from '../../repositories';
import type { PageMutators } from '../../types';

/**
 * Initialize the pages mutators.
 *
 * @param {PagesRepository} repository - The page repository.
 * @returns {PageMutators} The page mutators.
 */
export const initPageMutators = (repository: PagesRepository): PageMutators => {
  return {
    page: {
      create: async (data) => repository.create(data),
      del: async (data) => repository.remove(data),
      update: async (data) => repository.updatePage(data),
    },
  };
};

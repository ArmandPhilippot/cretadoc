import type { DocRepository } from '../../../repositories';
import type { DocDirectoryMutators } from '../../../types';

/**
 * Initialize the documentation directory mutators.
 *
 * @param {DocRepository} repository - The documentation repository.
 * @returns {DocDirectoryMutators} The documentation directory mutators.
 */
export const initDocDirectoryMutators = (
  repository: DocRepository
): DocDirectoryMutators => {
  return {
    directory: {
      create: async (data) => repository.createDirectory(data),
      del: async (data) => repository.remove(data, 'directory'),
      update: async (data) => repository.updateDirectory(data),
    },
  };
};

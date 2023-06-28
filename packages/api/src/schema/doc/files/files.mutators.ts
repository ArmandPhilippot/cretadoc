import type { DocRepository } from '../../../repositories';
import type { DocFileMutators } from '../../../types';

/**
 * Initialize the documentation file mutators.
 *
 * @param {DocRepository} repository - The documentation repository.
 * @returns {DocFileMutators} The documentation file mutators.
 */
export const initDocFileMutators = (
  repository: DocRepository
): DocFileMutators => {
  return {
    file: {
      create: async (data) => repository.createFile(data),
      del: async (data) => repository.remove(data, 'file'),
      update: async (data) => repository.updateFile(data),
    },
  };
};

import type { DocRepository } from '../../../repositories';
import type { DocFileMutators } from '../../../types';
import { createDocFile } from './create';
import { deleteDocFile } from './delete';
import { updateDocFile } from './update';

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
      create: async (data) => createDocFile(repository, data),
      del: async (data) => deleteDocFile(repository, data),
      update: async (data) => updateDocFile(repository, data),
    },
  };
};

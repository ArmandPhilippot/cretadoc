import type { DocRepository } from '../../../repositories';
import type { DocDirectoryMutators } from '../../../types';
import { createDocDirectory } from './create';
import { deleteDocDirectory } from './delete';
import { updateDocDirectory } from './update';

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
      create: async (data) => createDocDirectory(repository, data),
      del: async (data) => deleteDocDirectory(repository, data),
      update: async (data) => updateDocDirectory(repository, data),
    },
  };
};

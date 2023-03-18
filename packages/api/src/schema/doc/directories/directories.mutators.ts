import type { DocDirectoryMutators } from '../../../types';
import type { DocRepository } from '../doc.repository';
import { createDocDirectory } from './create/create.mutator';
import { deleteDocDirectory } from './delete/delete.mutator';
import { updateDocDirectory } from './update/update.mutator';

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

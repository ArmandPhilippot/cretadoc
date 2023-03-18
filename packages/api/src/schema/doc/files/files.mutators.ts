import type { DocFileMutators } from '../../../types';
import type { DocRepository } from '../doc.repository';
import { createDocFile } from './create/create.mutator';
import { deleteDocFile } from './delete/delete.mutator';
import { updateDocFile } from './update/update.mutator';

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

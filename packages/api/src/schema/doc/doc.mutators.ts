import type { DocRepository } from '../../repositories';
import type { DocMutators } from '../../types';
import { initDocDirectoryMutators } from './directories';
import { initDocFileMutators } from './files';

/**
 * Initialize the documentation mutators.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocMutators} The documentation mutators.
 */
export const initDocMutators = (repository: DocRepository): DocMutators => {
  return {
    doc: {
      ...initDocDirectoryMutators(repository),
      ...initDocFileMutators(repository),
    },
  };
};

import type { DocMutators } from '../../types';
import { initDocDirectoryMutators } from './directories/directories.mutators';
import type { DocRepository } from './doc.repository';
import { initDocFileMutators } from './files/files.mutators';

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

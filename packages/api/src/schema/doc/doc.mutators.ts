import type { DocMutators } from '../../types';
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
      ...initDocFileMutators(repository),
    },
  };
};

import type { DocFileLoaders } from '../../../types';
import type { DocRepository } from '../doc.repository';
import { getDocFileById, getDocFileByPath } from './read/read.loaders';

/**
 * Initialize the documentation file loaders.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocFileLoaders} The documentation file loaders.
 */
export const initDocFileLoaders = (
  repository: DocRepository
): DocFileLoaders => {
  return {
    file: {
      byId: getDocFileById(repository),
      byPath: getDocFileByPath(repository),
    },
  };
};

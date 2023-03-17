import type { DocDirectoryLoaders } from '../../../types';
import type { DocRepository } from '../doc.repository';
import {
  getDocDirectoryById,
  getDocDirectoryByPath,
} from './read/read.loaders';

/**
 * Initialize the documentation directory loaders.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocDirectoryLoaders} The documentation directory loaders.
 */
export const initDocDirectoryLoaders = (
  repository: DocRepository
): DocDirectoryLoaders => {
  return {
    directory: {
      byId: getDocDirectoryById(repository),
      byPath: getDocDirectoryByPath(repository),
    },
  };
};

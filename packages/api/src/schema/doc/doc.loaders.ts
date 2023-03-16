import type { DocLoaders } from '../../types';
import type { DocRepository } from './doc.repository';
import { initDocFileLoaders } from './files/files.loaders';

/**
 * Initialize the documentation loaders.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocLoaders} The documentation loaders.
 */
export const initDocLoaders = (repository: DocRepository): DocLoaders => {
  return {
    doc: {
      ...initDocFileLoaders(repository),
    },
  };
};

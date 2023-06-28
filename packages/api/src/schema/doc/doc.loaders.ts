import type { DocRepository } from '../../repositories';
import type { DocLoaders } from '../../types';
import { initDocDirectoryLoaders } from './directories';
import { initDocEntryLoaders } from './entries';
import { initDocFileLoaders } from './files';

/**
 * Initialize the documentation loaders.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocLoaders} The documentation loaders.
 */
export const initDocLoaders = (repository: DocRepository): DocLoaders => {
  return {
    doc: {
      ...initDocDirectoryLoaders(repository),
      ...initDocEntryLoaders(repository),
      ...initDocFileLoaders(repository),
    },
  };
};

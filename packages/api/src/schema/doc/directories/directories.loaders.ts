import type { DocRepository } from '../../../repositories';
import type {
  DocDirectory,
  DocDirectoryInput,
  DocDirectoryLoaders,
  ListInput,
} from '../../../types';
import { listDocDirectories } from './list/list.loaders';
import {
  getDocDirectoryById,
  getDocDirectoryByPath,
  getDocDirectoryBySlug,
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
      bySlug: getDocDirectoryBySlug(repository),
      list: async (params: ListInput<DocDirectory>) =>
        listDocDirectories(repository, params),
    },
  };
};

/**
 * Clear the documentation directories loaders.
 *
 * @param {DocDirectoryLoaders['directory']} directoryLoaders - The dir loaders.
 * @param {DocDirectoryInput} input - The directory id and path.
 */
export const clearDocDirectoryLoaders = (
  directoryLoaders: DocDirectoryLoaders['directory'],
  { id, path }: DocDirectoryInput
) => {
  directoryLoaders.byId.clear(id);
  directoryLoaders.byPath.clear(path);
};

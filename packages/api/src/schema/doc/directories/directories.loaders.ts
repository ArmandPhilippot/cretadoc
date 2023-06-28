import type { DocRepository } from '../../../repositories';
import type {
  DocDirectory,
  DocDirectoryInput,
  DocDirectoryLoaders,
  ListInput,
} from '../../../types';
import { loadDocDirectoriesList } from './list';
import {
  loadDocDirectoryById,
  loadDocDirectoryByPath,
  loadDocDirectoryBySlug,
} from './read';

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
      byId: loadDocDirectoryById(repository),
      byPath: loadDocDirectoryByPath(repository),
      bySlug: loadDocDirectoryBySlug(repository),
      list: async (params: ListInput<DocDirectory>) =>
        loadDocDirectoriesList(repository, params),
    },
  };
};

/**
 * Clear the documentation directories loaders.
 *
 * @param {DocDirectoryLoaders['directory']} directoryLoaders - The dir loaders.
 * @param {DocDirectoryInput} input - The directory id, path and slug.
 */
export const clearDocDirectoryLoaders = (
  directoryLoaders: DocDirectoryLoaders['directory'],
  { id, path, slug }: DocDirectoryInput
) => {
  directoryLoaders.byId.clear(id);
  directoryLoaders.byPath.clear(path);
  directoryLoaders.bySlug.clear(slug);
};

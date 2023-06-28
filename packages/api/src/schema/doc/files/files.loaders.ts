import type { DocRepository } from '../../../repositories';
import type {
  DocFile,
  DocFileInput,
  DocFileLoaders,
  ListInput,
} from '../../../types';
import { loadDocFilesList } from './list';
import { loadDocFileById, loadDocFileByPath, loadDocFileBySlug } from './read';

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
      byId: loadDocFileById(repository),
      byPath: loadDocFileByPath(repository),
      bySlug: loadDocFileBySlug(repository),
      list: async (params: ListInput<DocFile>) =>
        loadDocFilesList(repository, params),
    },
  };
};

/**
 * Clear the documentation files loaders.
 *
 * @param {DocFileLoaders['file']} fileLoaders - The file loaders.
 * @param {DocFileInput} input - The file id, path and slug.
 */
export const clearDocFileLoaders = (
  fileLoaders: DocFileLoaders['file'],
  { id, path, slug }: DocFileInput
) => {
  fileLoaders.byId.clear(id);
  fileLoaders.byPath.clear(path);
  fileLoaders.bySlug.clear(slug);
};

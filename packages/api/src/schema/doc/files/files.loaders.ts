import type {
  DocFile,
  DocFileInput,
  DocFileLoaders,
  ListInput,
} from '../../../types';
import type { DocRepository } from '../doc.repository';
import { listDocFiles } from './list/list.loaders';
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
      list: async (params: ListInput<DocFile>) =>
        listDocFiles(repository, params),
    },
  };
};

/**
 * Clear the documentation files loaders.
 *
 * @param {DocFileLoaders['file']} fileLoaders - The file loaders.
 * @param {DocFileInput} input - The file id and path.
 */
export const clearDocFileLoaders = (
  fileLoaders: DocFileLoaders['file'],
  { id, path }: DocFileInput
) => {
  fileLoaders.byId.clear(id);
  fileLoaders.byPath.clear(path);
};

import type { DocRepository } from '../../../repositories';
import type { DocEntry, DocEntryLoaders, ListInput } from '../../../types';
import { loadDocEntriesList } from './list';
import {
  loadDocEntryById,
  loadDocEntryByPath,
  loadDocEntryBySlug,
} from './read';

/**
 * Initialize the documentation entry loaders.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DocEntryLoaders} The documentation entry loaders.
 */
export const initDocEntryLoaders = (
  repository: DocRepository
): DocEntryLoaders => {
  return {
    entry: {
      byId: loadDocEntryById(repository),
      byPath: loadDocEntryByPath(repository),
      bySlug: loadDocEntryBySlug(repository),
      list: async (params: ListInput<DocEntry>) =>
        loadDocEntriesList(repository, params),
    },
  };
};

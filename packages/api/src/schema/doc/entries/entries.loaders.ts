import type { DocRepository } from '../../../repositories';
import type { DocEntry, DocEntryLoaders, ListInput } from '../../../types';
import { listDocEntries } from './list/list.loaders';
import {
  getDocEntryById,
  getDocEntryByPath,
  getDocEntryBySlug,
} from './read/read.loaders';

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
      byId: getDocEntryById(repository),
      byPath: getDocEntryByPath(repository),
      bySlug: getDocEntryBySlug(repository),
      list: async (params: ListInput<DocEntry>) =>
        listDocEntries(repository, params),
    },
  };
};

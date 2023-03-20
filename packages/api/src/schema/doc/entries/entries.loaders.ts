import type { DocEntry, DocEntryLoaders, ListInput } from '../../../types';
import type { DocRepository } from '../doc.repository';
import { listDocEntries } from './list/list.loaders';
import { getDocEntryById, getDocEntryByPath } from './read/read.loaders';

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
      list: async (params: ListInput<DocEntry>) =>
        listDocEntries(repository, params),
    },
  };
};

import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../repositories';
import type {
  DocEntry,
  DocEntryInput,
  DocEntryLoaders,
  ListInput,
} from '../../../types';

/**
 * Use the repository to look for doc entries.
 *
 * @param {DocRepository} repository - The Doc repository.
 */
const use = (repository: DocRepository) => {
  return {
    /**
     * Retrieve many entries by looking for values in a property.
     *
     * @param {P} prop - The property where to look for matching entries.
     * @param {ReadonlyArray<DocEntryInput[P]>} values - The values to look for.
     * @returns {Promise<Array<Maybe<DocEntry>>>} The matching entries.
     */
    getEntriesBy: async <P extends keyof DocEntryInput>(
      prop: P,
      values: ReadonlyArray<DocEntryInput[P]>
    ): Promise<Array<Maybe<DocEntry>>> => {
      const docEntries = await repository.getMany(prop, values);

      return values.map((value) =>
        docEntries?.find((entry) => entry[prop] === value)
      );
    },
  };
};

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
      byId: new DataLoader<DocEntryInput['id'], Maybe<DocEntry>>(async (ids) =>
        use(repository).getEntriesBy('id', ids)
      ),
      byPath: new DataLoader<DocEntryInput['path'], Maybe<DocEntry>>(
        async (paths) => use(repository).getEntriesBy('path', paths)
      ),
      bySlug: new DataLoader<DocEntryInput['slug'], Maybe<DocEntry>>(
        async (slugs) => use(repository).getEntriesBy('slug', slugs)
      ),
      list: async (params?: ListInput<DocEntry>) => repository.find(params),
    },
  };
};

import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../repositories';
import type {
  DocDirectory,
  DocDirectoryInput,
  DocDirectoryLoaders,
  ListInput,
} from '../../../types';

/**
 * Use the repository to look for doc directories.
 *
 * @param {DocRepository} repository - The Doc repository.
 */
const use = (repository: DocRepository) => {
  return {
    /**
     * Retrieve many directories by looking for values in a property.
     *
     * @param {P} prop - The property where to look for matching directories.
     * @param {ReadonlyArray<DocDirectoryInput[P]>} values - The values to look for.
     * @returns {Promise<Array<Maybe<DocDirectory>>>} The matching directories.
     */
    getDirectoriesBy: async <P extends keyof DocDirectoryInput>(
      prop: P,
      values: ReadonlyArray<DocDirectoryInput[P]>
    ): Promise<Array<Maybe<DocDirectory>>> => {
      const docDirectories = await repository.getMany(
        prop,
        values,
        'directory'
      );

      return values.map((value) =>
        docDirectories?.find((dir) => dir[prop] === value)
      );
    },
  };
};

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
      byId: new DataLoader<DocDirectoryInput['id'], Maybe<DocDirectory>>(
        async (ids) => use(repository).getDirectoriesBy('id', ids)
      ),
      byPath: new DataLoader<DocDirectoryInput['path'], Maybe<DocDirectory>>(
        async (paths) => use(repository).getDirectoriesBy('path', paths)
      ),
      bySlug: new DataLoader<DocDirectoryInput['slug'], Maybe<DocDirectory>>(
        async (slugs) => use(repository).getDirectoriesBy('slug', slugs)
      ),
      list: async (params?: ListInput<DocDirectory>) =>
        repository.find(params, 'directory'),
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

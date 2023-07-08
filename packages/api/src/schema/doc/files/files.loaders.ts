import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../repositories';
import type {
  DocFile,
  DocFileInput,
  DocFileLoaders,
  ListInput,
} from '../../../types';

/**
 * Use the repository to look for doc files.
 *
 * @param {DocRepository} repository - The Doc repository.
 */
const use = (repository: DocRepository) => {
  return {
    /**
     * Retrieve many files by looking for values in a property.
     *
     * @param {P} prop - The property where to look for matching files.
     * @param {ReadonlyArray<DocFileInput[P]>} values - The values to look for.
     * @returns {Promise<Array<Maybe<DocFile>>>} The matching files.
     */
    getFilesBy: async <P extends keyof DocFileInput>(
      prop: P,
      values: ReadonlyArray<DocFileInput[P]>
    ): Promise<Array<Maybe<DocFile>>> => {
      const docFiles = await repository.getMany(prop, values, 'file');

      return values.map((value) =>
        docFiles?.find((file) => file[prop] === value)
      );
    },
  };
};

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
      byId: new DataLoader<DocFileInput['id'], Maybe<DocFile>>(async (ids) =>
        use(repository).getFilesBy('id', ids)
      ),
      byPath: new DataLoader<DocFileInput['path'], Maybe<DocFile>>(
        async (paths) => use(repository).getFilesBy('path', paths)
      ),
      bySlug: new DataLoader<DocFileInput['slug'], Maybe<DocFile>>(
        async (slugs) => use(repository).getFilesBy('slug', slugs)
      ),
      list: async (params?: ListInput<DocFile>) =>
        repository.find({ ...params, kind: 'file' }),
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

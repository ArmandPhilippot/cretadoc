import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../../repositories';
import type { DocFile, DocFileInput } from '../../../../types';

/**
 * Retrieve many files using values to looking for in a property.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {P} prop - The property where to look for matching files.
 * @param {ReadonlyArray<DocFileInput[P]>} values - The values to looking for.
 * @returns {Promise<Array<Maybe<DocFile>>>} The matching files.
 */
const getDocFileBy = async <P extends keyof DocFileInput>(
  repository: DocRepository,
  prop: P,
  values: ReadonlyArray<DocFileInput[P]>
): Promise<Array<Maybe<DocFile>>> => {
  const docFiles = await repository.getMany(prop, values, 'file');

  return values.map((value) => docFiles?.find((file) => file[prop] === value));
};

/**
 * Retrieve many files by id.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocFile>, string>} The Data Loader.
 */
export const getDocFileById = (
  repository: DocRepository
): DataLoader<string, Maybe<DocFile>, string> =>
  new DataLoader<DocFileInput['id'], Maybe<DocFile>>(async (ids) =>
    getDocFileBy(repository, 'id', ids)
  );

/**
 * Retrieve many files by path.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocFile>, string>} The Data Loader.
 */
export const getDocFileByPath = (
  repository: DocRepository
): DataLoader<string, Maybe<DocFile>, string> =>
  new DataLoader<DocFileInput['path'], Maybe<DocFile>>(async (paths) =>
    getDocFileBy(repository, 'path', paths)
  );

/**
 * Retrieve many files by slug.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocFile>, string>} The Data Loader.
 */
export const getDocFileBySlug = (
  repository: DocRepository
): DataLoader<string, Maybe<DocFile>, string> =>
  new DataLoader<DocFileInput['slug'], Maybe<DocFile>>(async (slugs) =>
    getDocFileBy(repository, 'slug', slugs)
  );

import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../../repositories';
import type { DocDirectory, DocDirectoryInput } from '../../../../types';

/**
 * Retrieve many directories using values to looking for in a property.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {P} prop - The property where to look for matching directories.
 * @param {ReadonlyArray<DocDirectoryInput[P]>} values - The values to looking for.
 * @returns {Promise<Array<Maybe<DocDirectory>>>} The matching directories.
 */
const getDocDirectoryBy = async <P extends keyof DocDirectoryInput>(
  repository: DocRepository,
  prop: P,
  values: ReadonlyArray<DocDirectoryInput[P]>
): Promise<Array<Maybe<DocDirectory>>> => {
  const docDirectories = await repository.getMany(prop, values, 'directory');

  return values.map((value) =>
    docDirectories?.find((dir) => dir[prop] === value)
  );
};

/**
 * Retrieve many directories by id.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocDirectory>, string>} The Data Loader.
 */
export const getDocDirectoryById = (
  repository: DocRepository
): DataLoader<string, Maybe<DocDirectory>, string> =>
  new DataLoader<DocDirectoryInput['id'], Maybe<DocDirectory>>(async (ids) =>
    getDocDirectoryBy(repository, 'id', ids)
  );

/**
 * Retrieve many directories by path.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocDirectory>, string>} The Data Loader.
 */
export const getDocDirectoryByPath = (
  repository: DocRepository
): DataLoader<string, Maybe<DocDirectory>, string> =>
  new DataLoader<DocDirectoryInput['path'], Maybe<DocDirectory>>(
    async (paths) => getDocDirectoryBy(repository, 'path', paths)
  );

/**
 * Retrieve many directories by slug.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocDirectory>, string>} The Data Loader.
 */
export const getDocDirectoryBySlug = (
  repository: DocRepository
): DataLoader<string, Maybe<DocDirectory>, string> =>
  new DataLoader<DocDirectoryInput['slug'], Maybe<DocDirectory>>(
    async (slugs) => getDocDirectoryBy(repository, 'slug', slugs)
  );

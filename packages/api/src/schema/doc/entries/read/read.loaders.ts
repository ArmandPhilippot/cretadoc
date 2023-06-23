import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../../repositories';
import type { DocEntry, DocEntryInput } from '../../../../types';

/**
 * Retrieve many entries using values to looking for in a property.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {P} prop - The property where to look for matching entries.
 * @param {ReadonlyArray<DocEntryInput[P]>} values - The values to looking for.
 * @returns {Promise<Array<Maybe<DocEntry>>>} The matching entries.
 */
const getDocEntryBy = async <P extends keyof DocEntryInput>(
  repository: DocRepository,
  prop: P,
  values: ReadonlyArray<DocEntryInput[P]>
): Promise<Array<Maybe<DocEntry>>> => {
  const docEntries = await repository.getMany(prop, values);

  return values.map((value) =>
    docEntries?.find((file) => file[prop] === value)
  );
};

/**
 * Retrieve many entries by id.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocEntry>, string>} The Data Loader.
 */
export const getDocEntryById = (
  repository: DocRepository
): DataLoader<string, Maybe<DocEntry>, string> =>
  new DataLoader<DocEntryInput['id'], Maybe<DocEntry>>(async (ids) =>
    getDocEntryBy(repository, 'id', ids)
  );

/**
 * Retrieve many entries by path.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocEntry>, string>} The Data Loader.
 */
export const getDocEntryByPath = (
  repository: DocRepository
): DataLoader<string, Maybe<DocEntry>, string> =>
  new DataLoader<DocEntryInput['path'], Maybe<DocEntry>>(async (paths) =>
    getDocEntryBy(repository, 'path', paths)
  );

/**
 * Retrieve many entries by slug.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @returns {DataLoader<string, Maybe<DocEntry>, string>} The Data Loader.
 */
export const getDocEntryBySlug = (
  repository: DocRepository
): DataLoader<string, Maybe<DocEntry>, string> =>
  new DataLoader<DocEntryInput['slug'], Maybe<DocEntry>>(async (slugs) =>
    getDocEntryBy(repository, 'slug', slugs)
  );

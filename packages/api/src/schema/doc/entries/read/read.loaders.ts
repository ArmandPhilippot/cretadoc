import { dirname } from 'path';
import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocRepository } from '../../../../repositories';
import type { DocEntry, DocEntryInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';

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
  let relativePath: Maybe<string> = undefined;

  if (prop === 'id') {
    const lastId = values[values.length - 1];
    if (lastId) relativePath = decodeBase64String(lastId);
  } else relativePath = values[values.length - 1];

  const basePath = relativePath ? dirname(relativePath) : undefined;
  const docEntries = await repository.getMany(prop, values, {
    parentPath: basePath,
  });

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

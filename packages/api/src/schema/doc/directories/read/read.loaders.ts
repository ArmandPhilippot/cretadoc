import { dirname } from 'path';
import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocDirectory, DocDirectoryInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';
import type { DocRepository } from '../../doc.repository';

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
  let relativePath: Maybe<string> = undefined;

  if (prop === 'id') {
    const lastId = values[values.length - 1];
    if (lastId) relativePath = decodeBase64String(lastId);
  } else relativePath = values[values.length - 1];

  const basePath = relativePath ? dirname(relativePath) : undefined;
  const docDirectories = await repository.getMany(prop, values, {
    kind: 'directory',
    parentPath: basePath,
  });

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

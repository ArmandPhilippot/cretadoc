import { dirname } from 'path';
import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { DocFile, DocFileInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';
import type { DocRepository } from '../../doc.repository';

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
  let relativePath: Maybe<string> = undefined;

  if (prop === 'id') {
    const lastId = values[values.length - 1];
    if (lastId) relativePath = decodeBase64String(lastId);
  } else relativePath = values[values.length - 1];

  const basePath = relativePath ? dirname(relativePath) : undefined;
  const docFiles = await repository.getManyFile(prop, values, basePath);

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

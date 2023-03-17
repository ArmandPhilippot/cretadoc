import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { ListLoader, Payload } from '../generics';
import type { Connection, QueryResult } from '../gql';
import type { DocEntryParent } from './doc';

export type DocFile = Omit<RegularFile, 'extension'> & {
  parent: Nullable<DocEntryParent>;
};

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type DocFileInput = Pick<DocFile, 'id' | 'path'>;

export type DocFilePayload = Payload<
  'file',
  NullableOptionalKeysOf<DocFile, true>
>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type DocFileWhereFields = Partial<
  Pick<DocFile, 'createdAt' | 'name' | 'path' | 'updatedAt'>
>;

export type DocFileOrderFields = Pick<
  DocFile,
  'createdAt' | 'name' | 'path' | 'updatedAt'
>;

export type DocFileConnectionPayload = Payload<
  'files',
  NullableOptionalKeysOf<Connection<DocFile>, true>
>;

export type DocFileConnectionResult = QueryResult<DocFileConnectionPayload>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocFileByIdLoader = DataLoader<DocFileInput['id'], Maybe<DocFile>>;

export type DocFileByPathLoader = DataLoader<
  DocFileInput['path'],
  Maybe<DocFile>
>;

export type DocFileLoaders = {
  file: {
    byId: DocFileByIdLoader;
    byPath: DocFileByPathLoader;
    list: ListLoader<DocFile>;
  };
};

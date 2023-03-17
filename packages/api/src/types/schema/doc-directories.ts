import type { Directory } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { ListLoader, Payload } from '../generics';
import type { Connection, QueryResult } from '../gql';
import type { DocEntryParent } from './doc';

export type DocDirectory = Omit<Directory, 'extension'> & {
  parent: Nullable<DocEntryParent>;
};

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type DocDirectoryInput = Pick<DocDirectory, 'id' | 'path'>;

export type DocDirectoryPayload = Payload<
  'directory',
  NullableOptionalKeysOf<DocDirectory, true>
>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type DocDirectoryWhereFields = Partial<
  Pick<DocDirectory, 'createdAt' | 'name' | 'path' | 'updatedAt'>
>;

export type DocDirectoryOrderFields = Pick<
  DocDirectory,
  'createdAt' | 'name' | 'path' | 'updatedAt'
>;

export type DocDirectoryConnectionPayload = Payload<
  'directories',
  NullableOptionalKeysOf<Connection<DocDirectory>, true>
>;

export type DocDirectoryConnectionResult =
  QueryResult<DocDirectoryConnectionPayload>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocDirectoryByIdLoader = DataLoader<
  DocDirectoryInput['id'],
  Maybe<DocDirectory>
>;

export type DocDirectoryByPathLoader = DataLoader<
  DocDirectoryInput['path'],
  Maybe<DocDirectory>
>;

export type DocDirectoryLoaders = {
  directory: {
    byId: DocDirectoryByIdLoader;
    byPath: DocDirectoryByPathLoader;
    list: ListLoader<DocDirectory>;
  };
};

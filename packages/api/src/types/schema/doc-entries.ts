import type { NullableOptionalKeysOf } from '@cretadoc/utils';
import type { ListLoader, Payload } from '../generics';
import type { Connection, QueryResult } from '../gql';
import type { DocDirectory } from './doc-directories';
import type { DocFile } from './doc-files';

export type DocEntry = DocDirectory | DocFile;

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type DocEntryInput = Pick<DocEntry, 'id' | 'path'>;

export type DocEntryPayload = Payload<
  'entry',
  NullableOptionalKeysOf<DocEntry, true>
>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type DocEntryWhereFields = Partial<
  Pick<DocEntry, 'createdAt' | 'name' | 'path' | 'updatedAt'>
>;

export type DocEntryOrderFields = Pick<
  DocEntry,
  'createdAt' | 'name' | 'path' | 'updatedAt'
>;

export type DocEntryConnectionPayload = Payload<
  'entries',
  NullableOptionalKeysOf<Connection<DocEntry>, true>
>;

export type DocEntryConnectionResult = QueryResult<DocEntryConnectionPayload>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocEntryLoaders = {
  entry: {
    list: ListLoader<DocEntry>;
  };
};

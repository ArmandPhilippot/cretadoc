import type { Directory, RegularFile } from '@cretadoc/read-dir';
import type { Payload } from '../generics';
import type { QueryResult } from '../gql';
import type {
  DocDirectoryConnectionPayload,
  DocDirectoryLoaders,
  DocDirectoryPayload,
} from './doc-directories';
import type {
  DocFileConnectionPayload,
  DocFileLoaders,
  DocFileMutators,
  DocFilePayload,
} from './doc-files';

export type Doc = DocDirectoryPayload &
  DocDirectoryConnectionPayload &
  DocFilePayload &
  DocFileConnectionPayload;

export type DocEntryKind = Directory['type'] | RegularFile['type'];

export type DocEntryParent = Pick<
  Directory | RegularFile,
  'id' | 'name' | 'path'
>;

/*
 * ===========================================================================
 *  Result types
 * ===========================================================================
 */

export type DocPayload = Payload<'doc', Doc>;

export type DocResult = QueryResult<DocPayload>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocLoaders = {
  doc?: DocDirectoryLoaders & DocFileLoaders;
};

/*
 * ===========================================================================
 *  Mutators types
 * ===========================================================================
 */

export type DocMutators = {
  doc?: DocFileMutators;
};
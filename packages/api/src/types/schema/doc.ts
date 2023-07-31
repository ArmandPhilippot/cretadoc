import type { Directory, RegularFile } from '@cretadoc/read-dir';
import type { Meta, Slug } from '../data';
import type { Payload } from '../generics';
import type { QueryResult } from '../gql';
import type {
  DocDirectoryConnectionPayload,
  DocDirectoryLoaders,
  DocDirectoryMutators,
  DocDirectoryPayload,
} from './doc-directories';
import type {
  DocEntryConnectionPayload,
  DocEntryLoaders,
  DocEntryPayload,
} from './doc-entries';
import type {
  DocFileConnectionPayload,
  DocFileLoaders,
  DocFileMutators,
  DocFilePayload,
} from './doc-files';

export type Doc = Partial<
  DocDirectoryPayload &
    DocDirectoryConnectionPayload &
    DocEntryPayload &
    DocEntryConnectionPayload &
    DocFilePayload &
    DocFileConnectionPayload
>;

export type DocEntryKind = Directory['type'] | RegularFile['type'];

export type DocEntryParent = Pick<
  Directory | RegularFile,
  'id' | 'name' | 'path'
> & {
  meta?: Meta;
  slug: Slug;
};

/*
 * ===========================================================================
 *  Result types
 * ===========================================================================
 */

export type DocPayload<T extends Doc = Doc> = Payload<'doc', Partial<T>>;

export type DocResult<T extends Doc = Doc> = QueryResult<DocPayload<T>>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocLoaders = {
  doc?: DocDirectoryLoaders & DocEntryLoaders & DocFileLoaders;
};

/*
 * ===========================================================================
 *  Mutators types
 * ===========================================================================
 */

export type DocMutators = {
  doc?: DocDirectoryMutators & DocFileMutators;
};

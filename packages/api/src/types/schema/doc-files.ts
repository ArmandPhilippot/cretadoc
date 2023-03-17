import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type {
  ErrorsFrom,
  InputFrom,
  ListLoader,
  MutationResult,
  Mutator,
  Payload,
} from '../generics';
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
 *  Create types
 * ===========================================================================
 */

export type DocFileCreate = Pick<DocFile, 'content' | 'name'> & {
  parentPath?: string;
};

export type DocFileCreateInput = InputFrom<DocFileCreate>;

export type DocFileCreateErrors = ErrorsFrom<DocFileCreate>;

export type DocFileCreatePayload = DocFilePayload | DocFileCreateErrors;

export type DocFileCreateResult = MutationResult<
  'docFileCreate',
  DocFileCreatePayload
>;

export type DocFileCreateMutator = Mutator<DocFileCreate, DocFile>;

/*
 * ===========================================================================
 *  Update types
 * ===========================================================================
 */

export type DocFileUpdate = Pick<DocFile, 'id'> & Partial<DocFileCreate>;

export type DocFileUpdateInput = InputFrom<DocFileUpdate>;

export type DocFileUpdateErrors = ErrorsFrom<DocFileUpdate>;

export type DocFileUpdatePayload = DocFilePayload | DocFileUpdateErrors;

export type DocFileUpdateResult = MutationResult<
  'docFileUpdate',
  DocFileUpdatePayload
>;

export type DocFileUpdateMutator = Mutator<DocFileUpdate, DocFile>;

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

/*
 * ===========================================================================
 *  Mutators types
 * ===========================================================================
 */

export type DocFileMutators = {
  file: {
    create: DocFileCreateMutator;
    update: DocFileUpdateMutator;
  };
};

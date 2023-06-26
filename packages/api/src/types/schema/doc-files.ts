import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { Meta } from '../data';
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
  meta?: Meta;
  parent: Nullable<DocEntryParent>;
  slug: `/${string}`;
};

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type DocFileInput = Pick<DocFile, 'id' | 'path' | 'slug'>;

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
  'createdAt' | 'name' | 'path' | 'slug' | 'updatedAt'
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

export type DocFileCreate = Pick<DocFile, 'contents' | 'meta' | 'name'> & {
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
 *  Delete types
 * ===========================================================================
 */

export type DocFileDelete = Partial<Pick<DocFile, 'id' | 'path'>>;

export type DocFileDeleteInput = InputFrom<DocFileDelete>;

export type DocFileDeleteErrors = ErrorsFrom<DocFileDelete>;

export type DocFileDeletePayload = DocFilePayload | DocFileDeleteErrors;

export type DocFileDeleteResult = MutationResult<
  'docFileDelete',
  DocFileDeletePayload
>;

export type DocFileDeleteMutator = Mutator<DocFileDelete, DocFile>;

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

export type DocFileBySlugLoader = DataLoader<
  DocFileInput['slug'],
  Maybe<DocFile>
>;

export type DocFileLoaders = {
  file: {
    byId: DocFileByIdLoader;
    byPath: DocFileByPathLoader;
    bySlug: DocFileBySlugLoader;
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
    del: DocFileDeleteMutator;
    update: DocFileUpdateMutator;
  };
};

import type { Directory } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { Meta, Slug } from '../data';
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
import type { DocFile } from './doc-files';

export type DocDirectoryContents = {
  directories: DocDirectory[];
  files: DocFile[];
};

export type DocDirectory = Omit<Directory, 'contents' | 'extension'> & {
  contents: DocDirectoryContents;
  meta?: Meta;
  parent: Nullable<DocEntryParent>;
  slug: Slug;
};

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type DocDirectoryInput = Pick<DocDirectory, 'id' | 'path' | 'slug'>;

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
  Pick<DocDirectory, 'createdAt' | 'name' | 'path' | 'slug' | 'updatedAt'>
>;

export type DocDirectoryOrderFields = Pick<
  DocDirectory,
  'createdAt' | 'name' | 'path' | 'slug' | 'updatedAt'
>;

export type DocDirectoryConnectionPayload = Payload<
  'directories',
  NullableOptionalKeysOf<Connection<DocDirectory>, true>
>;

export type DocDirectoryConnectionResult =
  QueryResult<DocDirectoryConnectionPayload>;

/*
 * ===========================================================================
 *  Create types
 * ===========================================================================
 */

export type DocDirectoryCreate = Pick<DocDirectory, 'meta' | 'name'> & {
  parentPath?: string;
};

export type DocDirectoryCreateInput = InputFrom<DocDirectoryCreate>;

export type DocDirectoryCreateErrors = ErrorsFrom<DocDirectoryCreate>;

export type DocDirectoryCreatePayload =
  | DocDirectoryPayload
  | DocDirectoryCreateErrors;

export type DocDirectoryCreateResult = MutationResult<
  'docDirectoryCreate',
  DocDirectoryCreatePayload
>;

export type DocDirectoryCreateMutator = Mutator<
  DocDirectoryCreate,
  DocDirectory
>;

/*
 * ===========================================================================
 *  Delete types
 * ===========================================================================
 */

export type DocDirectoryDeleteOptions = {
  /**
   * Should we delete only empty directories?
   * @default true
   */
  onlyEmpty?: boolean;
};

export type DocDirectoryDelete = Partial<Pick<DocDirectory, 'id' | 'path'>> &
  DocDirectoryDeleteOptions;

export type DocDirectoryDeleteInput = InputFrom<DocDirectoryDelete>;

export type DocDirectoryDeleteErrors = ErrorsFrom<DocDirectoryDelete>;

export type DocDirectoryDeletePayload =
  | DocDirectoryPayload
  | DocDirectoryDeleteErrors;

export type DocDirectoryDeleteResult = MutationResult<
  'docDirectoryDelete',
  DocDirectoryDeletePayload
>;

export type DocDirectoryDeleteMutator = Mutator<
  DocDirectoryDelete,
  DocDirectory
>;

/*
 * ===========================================================================
 *  Update types
 * ===========================================================================
 */

export type DocDirectoryUpdate = Pick<DocDirectory, 'id'> &
  Partial<DocDirectoryCreate>;

export type DocDirectoryUpdateInput = InputFrom<DocDirectoryUpdate>;

export type DocDirectoryUpdateErrors = ErrorsFrom<DocDirectoryUpdate>;

export type DocDirectoryUpdatePayload =
  | DocDirectoryPayload
  | DocDirectoryUpdateErrors;

export type DocDirectoryUpdateResult = MutationResult<
  'docDirectoryUpdate',
  DocDirectoryUpdatePayload
>;

export type DocDirectoryUpdateMutator = Mutator<
  DocDirectoryUpdate,
  DocDirectory
>;

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

export type DocDirectoryBySlugLoader = DataLoader<
  DocDirectoryInput['slug'],
  Maybe<DocDirectory>
>;

export type DocDirectoryLoaders = {
  directory: {
    byId: DocDirectoryByIdLoader;
    byPath: DocDirectoryByPathLoader;
    bySlug: DocDirectoryBySlugLoader;
    list: ListLoader<DocDirectory>;
  };
};

/*
 * ===========================================================================
 *  Mutators types
 * ===========================================================================
 */

export type DocDirectoryMutators = {
  directory: {
    create: DocDirectoryCreateMutator;
    del: DocDirectoryDeleteMutator;
    update: DocDirectoryUpdateMutator;
  };
};

import type { Directory } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { Payload } from '../generics';
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
  };
};

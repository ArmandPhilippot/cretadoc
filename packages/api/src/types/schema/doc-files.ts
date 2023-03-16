import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, Nullable, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { Payload } from '../generics';
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
  };
};

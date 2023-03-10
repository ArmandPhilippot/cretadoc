import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { Payload } from '../generics';

export type Page = Omit<RegularFile, 'extension' | 'type'>;

/*
 * ===========================================================================
 *  Payload types
 * ===========================================================================
 */

export type PagePayload = Payload<'page', NullableOptionalKeysOf<Page, true>>;

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type PageInput = Pick<Page, 'id' | 'name'>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type PageByIdLoader = DataLoader<PageInput['id'], Maybe<Page>>;

export type PageByNameLoader = DataLoader<PageInput['name'], Maybe<Page>>;

export type PageLoaders = {
  page?: {
    byId: PageByIdLoader;
    byName: PageByNameLoader;
  };
};

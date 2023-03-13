import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, NullableOptionalKeysOf } from '@cretadoc/utils';
import type DataLoader from 'dataloader';
import type { ListLoader, Payload } from '../generics';
import type { Connection, QueryResult } from '../gql';

export type Page = Omit<RegularFile, 'extension' | 'type'>;

/*
 * ===========================================================================
 *  Payload types
 * ===========================================================================
 */

export type PagePayload = Payload<'page', NullableOptionalKeysOf<Page, true>>;

export type PageConnectionPayload = Payload<
  'pages',
  NullableOptionalKeysOf<Connection<Page>, true>
>;

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type PageInput = Pick<Page, 'id' | 'name'>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type PageWhereFields = Partial<
  Pick<Page, 'createdAt' | 'name' | 'updatedAt'>
>;

export type PageOrderFields = Pick<Page, 'createdAt' | 'name' | 'updatedAt'>;

export type PageConnectionResult = QueryResult<PageConnectionPayload>;

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
    list: ListLoader<Page>;
  };
};

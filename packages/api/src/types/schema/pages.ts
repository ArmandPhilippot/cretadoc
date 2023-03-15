import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, NullableOptionalKeysOf } from '@cretadoc/utils';
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

export type Page = Omit<RegularFile, 'extension' | 'type'>;

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type PageInput = Pick<Page, 'id' | 'name'>;

export type PagePayload = Payload<'page', NullableOptionalKeysOf<Page, true>>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type PageWhereFields = Partial<
  Pick<Page, 'createdAt' | 'name' | 'updatedAt'>
>;

export type PageOrderFields = Pick<Page, 'createdAt' | 'name' | 'updatedAt'>;

export type PageConnectionPayload = Payload<
  'pages',
  NullableOptionalKeysOf<Connection<Page>, true>
>;

export type PageConnectionResult = QueryResult<PageConnectionPayload>;

/*
 * ===========================================================================
 *  Create types
 * ===========================================================================
 */

export type PageCreate = Pick<Page, 'content' | 'name'>;

export type PageCreateInput = InputFrom<PageCreate>;

export type PageCreateErrors = ErrorsFrom<PageCreate>;

export type PageCreatePayload = PagePayload | PageCreateErrors;

export type PageCreateResult = MutationResult<'pageCreate', PageCreatePayload>;

export type PageCreateMutator = Mutator<PageCreate, Page>;

/*
 * ===========================================================================
 *  Update types
 * ===========================================================================
 */

export type PageUpdate = Pick<Page, 'id'> & Partial<PageCreate>;

export type PageUpdateInput = InputFrom<PageUpdate>;

export type PageUpdateErrors = ErrorsFrom<PageUpdate>;

export type PageUpdatePayload = PagePayload | PageUpdateErrors;

export type PageUpdateResult = MutationResult<'pageUpdate', PageUpdatePayload>;

export type PageUpdateMutator = Mutator<PageUpdate, Page>;

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

/*
 * ===========================================================================
 *  Mutators types
 * ===========================================================================
 */

export type PageMutators = {
  page?: {
    create: PageCreateMutator;
    update: PageUpdateMutator;
  };
};

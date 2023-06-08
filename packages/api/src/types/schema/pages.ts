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

export type Page = Omit<RegularFile, 'extension' | 'type'> & {
  slug: `/${string}`;
};

/*
 * ===========================================================================
 *  Query types
 * ===========================================================================
 */

export type PageInput = Pick<Page, 'id' | 'name' | 'slug'>;

export type PagePayload = Payload<'page', NullableOptionalKeysOf<Page, true>>;

/*
 * ===========================================================================
 *  Connection types
 * ===========================================================================
 */

export type PageWhereFields = Partial<
  Pick<Page, 'createdAt' | 'name' | 'updatedAt'>
>;

export type PageOrderFields = Pick<
  Page,
  'createdAt' | 'name' | 'slug' | 'updatedAt'
>;

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

export type PageCreate = Pick<Page, 'contents' | 'name'>;

export type PageCreateInput = InputFrom<PageCreate>;

export type PageCreateErrors = ErrorsFrom<PageCreate>;

export type PageCreatePayload = PagePayload | PageCreateErrors;

export type PageCreateResult = MutationResult<'pageCreate', PageCreatePayload>;

export type PageCreateMutator = Mutator<PageCreate, Page>;

/*
 * ===========================================================================
 *  Delete types
 * ===========================================================================
 */

export type PageDelete = Partial<Pick<Page, 'id' | 'name'>>;

export type PageDeleteInput = InputFrom<PageDelete>;

export type PageDeleteErrors = ErrorsFrom<PageDelete>;

export type PageDeletePayload = PagePayload | PageDeleteErrors;

export type PageDeleteResult = MutationResult<'pageDelete', PageDeletePayload>;

export type PageDeleteMutator = Mutator<PageDelete, Page>;

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

export type PageBySlugLoader = DataLoader<PageInput['slug'], Maybe<Page>>;

export type PageLoaders = {
  page?: {
    byId: PageByIdLoader;
    byName: PageByNameLoader;
    bySlug: PageBySlugLoader;
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
    del: PageDeleteMutator;
    update: PageUpdateMutator;
  };
};

import type { Maybe, Nullable } from '@cretadoc/utils';
import type { DIRECTION } from '../utils/constants';
import type {
  ResolveInputFields,
  ResolveOrderFields,
  ResolveWhereFields,
} from './resolvers';

export type Payload<P extends string, T> = {
  [K in P]: Nullable<T>;
};

export type QueryInput<T> = Partial<ResolveInputFields<T>>;

export type Where<T> = {
  where?: T;
};

export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export type OrderBy<T> = {
  field: keyof T;
  direction: Direction;
};

export type Pagination<T, C extends string | undefined = undefined> = {
  after?: C;
  first: number;
  offset?: C extends string ? never : number;
  orderBy?: OrderBy<T>;
};

export type ConnectionInput<
  T,
  O = ResolveOrderFields<T>,
  W = ResolveWhereFields<T>
> = Pagination<O> & Where<W>;

export type ListInput<T> = Omit<ConnectionInput<T>, 'after' | 'offset'> & {
  after: number;
};

export type ListReturn<T> = {
  data: Maybe<T>;
  total: number;
};

export type ListLoader<T> = (params: ListInput<T>) => Promise<ListReturn<T[]>>;

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
  first?: number;
  offset?: C extends string ? never : number;
  orderBy?: OrderBy<T>;
};

export type ConnectionInput<
  T,
  O = ResolveOrderFields<T>,
  W = ResolveWhereFields<T>
> = Pagination<O> & Where<W>;

export type ListInput<T> = Omit<
  ConnectionInput<T>,
  'after' | 'first' | 'offset'
>;

export type ListLoader<T> = (params?: ListInput<T>) => Promise<T[]>;

export type Errors<T> = {
  [K in keyof T]-?: Nullable<string[]>;
};

export type ErrorsFrom<T> = {
  errors: Errors<T>;
};

export type InputFrom<T> = {
  input: T;
};

export type Mutator<Input, Return> = (input: Input) => Promise<Maybe<Return>>;

export type MutationResult<P extends string, T> = {
  [K in P]: T;
};

export type ValidationErrors<T> = Record<keyof T, string[]>;

export type NonOptionalKeysOf<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];

import type {
  Page,
  PageInput,
  PageOrderFields,
  PageWhereFields,
} from './schema';

export type ResolveInputFields<T> = T extends Page ? PageInput : never;

export type ResolveWhereFields<T> = T extends Page ? PageWhereFields : never;

export type ResolveOrderFields<T> = T extends Page ? PageOrderFields : never;

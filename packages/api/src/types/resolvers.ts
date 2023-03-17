import type {
  DocFile,
  DocFileInput,
  DocFileOrderFields,
  DocFileWhereFields,
  Page,
  PageInput,
  PageOrderFields,
  PageWhereFields,
} from './schema';

export type ResolveInputFields<T> = T extends DocFile
  ? DocFileInput
  : T extends Page
  ? PageInput
  : never;

export type ResolveWhereFields<T> = T extends DocFile
  ? DocFileWhereFields
  : T extends Page
  ? PageWhereFields
  : never;

export type ResolveOrderFields<T> = T extends DocFile
  ? DocFileOrderFields
  : T extends Page
  ? PageOrderFields
  : never;

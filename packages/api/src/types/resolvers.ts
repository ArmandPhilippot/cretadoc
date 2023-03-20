import type {
  DocDirectory,
  DocDirectoryInput,
  DocDirectoryOrderFields,
  DocDirectoryWhereFields,
  DocEntry,
  DocEntryInput,
  DocEntryOrderFields,
  DocEntryWhereFields,
  DocFile,
  DocFileInput,
  DocFileOrderFields,
  DocFileWhereFields,
  Page,
  PageInput,
  PageOrderFields,
  PageWhereFields,
} from './schema';

export type ResolveInputFields<T> = T extends DocDirectory
  ? DocDirectoryInput
  : T extends DocFile
  ? DocFileInput
  : T extends DocEntry
  ? DocEntryInput
  : T extends Page
  ? PageInput
  : never;

export type ResolveWhereFields<T> = T extends DocDirectory
  ? DocDirectoryWhereFields
  : T extends DocFile
  ? DocFileWhereFields
  : T extends DocEntry
  ? DocEntryWhereFields
  : T extends Page
  ? PageWhereFields
  : never;

export type ResolveOrderFields<T> = T extends DocDirectory
  ? DocDirectoryOrderFields
  : T extends DocFile
  ? DocFileOrderFields
  : T extends DocEntry
  ? DocEntryOrderFields
  : T extends Page
  ? PageOrderFields
  : never;

import { toBeDocDirectory, type ToBeDocDirectory } from './to-be-doc-directory';
import { toBeDocEntry, type ToBeDocEntry } from './to-be-doc-entry';
import { toBeDocFile, type ToBeDocFile } from './to-be-doc-file';
import { toBePage, type ToBePage } from './to-be-page';
import { toBePageInfo, type ToBePageInfo } from './to-be-page-info';

export type CustomMatchers = ToBeDocDirectory &
  ToBeDocEntry &
  ToBeDocFile &
  ToBePage &
  ToBePageInfo;

export const matchers = {
  toBeDocDirectory,
  toBeDocEntry,
  toBeDocFile,
  toBePage,
  toBePageInfo,
};

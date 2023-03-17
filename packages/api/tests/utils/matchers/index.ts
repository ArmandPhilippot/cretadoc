import { toBeDocDirectory, type ToBeDocDirectory } from './to-be-doc-directory';
import { toBeDocFile, type ToBeDocFile } from './to-be-doc-file';
import { toBePage, type ToBePage } from './to-be-page';
import { toBePageInfo, type ToBePageInfo } from './to-be-page-info';
import {
  toContainException,
  type ToContainException,
} from './to-contain-exception';
import { toRespondWith, type ToRespondWithMatcher } from './to-respond-with';

export type CustomMatchers = ToBeDocDirectory &
  ToBeDocFile &
  ToBePage &
  ToBePageInfo &
  ToContainException &
  ToRespondWithMatcher;

export const matchers = {
  toBeDocDirectory,
  toBeDocFile,
  toBePage,
  toBePageInfo,
  toContainException,
  toRespondWith,
};

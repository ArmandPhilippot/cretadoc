import { toBePage, type ToBePage } from './to-be-page';
import { toBePageInfo, type ToBePageInfo } from './to-be-page-info';
import {
  toContainException,
  type ToContainException,
} from './to-contain-exception';
import { toRespondWith, type ToRespondWithMatcher } from './to-respond-with';

export type CustomMatchers = ToBePage &
  ToBePageInfo &
  ToContainException &
  ToRespondWithMatcher;

export const matchers = {
  toBePage,
  toBePageInfo,
  toContainException,
  toRespondWith,
};

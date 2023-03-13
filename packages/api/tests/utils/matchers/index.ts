import { toBePage, type ToBePage } from './to-be-page';
import {
  toContainException,
  type ToContainException,
} from './to-contain-exception';
import { toRespondWith, type ToRespondWithMatcher } from './to-respond-with';

export type CustomMatchers = ToBePage &
  ToContainException &
  ToRespondWithMatcher;

export const matchers = {
  toBePage,
  toContainException,
  toRespondWith,
};

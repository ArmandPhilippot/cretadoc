import { toRespondWith, type ToRespondWithMatcher } from './to-respond-with';
import {
  toReturnException,
  type ToReturnException,
} from './to-return-exception';
import { toReturnPage, type ToReturnPage } from './to-return-page';

export type CustomMatchers = ToRespondWithMatcher &
  ToReturnException &
  ToReturnPage;

export const matchers = { toRespondWith, toReturnException, toReturnPage };

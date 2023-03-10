import { toRespondWith, type ToRespondWithMatcher } from './to-respond-with';
import { toReturnPage, type ToReturnPage } from './to-return-page';

export type CustomMatchers = ToRespondWithMatcher & ToReturnPage;

export const matchers = { toRespondWith, toReturnPage };

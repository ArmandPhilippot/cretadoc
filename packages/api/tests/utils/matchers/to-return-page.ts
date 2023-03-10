import { isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type { MatcherResult, PageWithoutDates } from '../types';

type PartialPagePayload = { page: Nullable<PageWithoutDates> };

export type ToReturnPage = {
  toReturnPage: (expected: PartialPagePayload) => MatcherResult;
};

export function toReturnPage(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  data: { page: Record<string, unknown> },
  expected: PartialPagePayload
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Page payload ${match}.`;

  const isContentMatching =
    isObjKeyExist(data.page, 'content') &&
    this.equals(data.page.content, expected.page?.content);

  const isIdMatching =
    isObjKeyExist(data.page, 'id') &&
    this.equals(data.page.id, expected.page?.id);

  const isNameMatching =
    isObjKeyExist(data.page, 'name') &&
    this.equals(data.page.name, expected.page?.name);

  const isPathMatching =
    isObjKeyExist(data.page, 'path') &&
    this.equals(data.page.path, expected.page?.path);

  return {
    pass: isContentMatching && isIdMatching && isNameMatching && isPathMatching,
    message,
    actual: data,
    expected,
  };
}

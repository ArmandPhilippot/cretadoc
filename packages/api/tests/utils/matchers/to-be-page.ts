import { isObjKeyExist, type Nullable } from '@cretadoc/utils';
import type { Page } from '../../../src/types';
import type { MatcherResult, PageWithoutDates } from '../../types';

export type ToBePage = {
  toBePage: (expected: Nullable<PageWithoutDates>) => MatcherResult;
};

export function toBePage(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  page: Nullable<Page>,
  expected: Nullable<PageWithoutDates>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Page payload ${match}.`;

  if (page === null)
    return {
      message,
      pass: this.equals(page, expected),
      actual: page,
      expected,
    };

  const isContentMatch =
    isObjKeyExist(page, 'content') &&
    this.equals(page.content, expected?.content);

  const isIdMatch =
    isObjKeyExist(page, 'id') && this.equals(page.id, expected?.id);

  const isNameMatch =
    isObjKeyExist(page, 'name') && this.equals(page.name, expected?.name);

  const isPathMatch =
    isObjKeyExist(page, 'path') && this.equals(page.path, expected?.path);

  return {
    pass: isContentMatch && isIdMatch && isNameMatch && isPathMatch,
    message,
    actual: page,
    expected,
  };
}

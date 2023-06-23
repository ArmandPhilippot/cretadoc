import { type Nullable, isObjKeyExist } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { Page } from '../../../src/types';
import type { MatcherResult } from '../../types';

export type ToBePage = {
  toBePage: (expected: Partial<Nullable<Page>>) => MatcherResult;
};

export function toBePage(
  this: ReturnType<ExpectStatic['getState']>,
  page: Nullable<Page>,
  expected: Partial<Nullable<Page>>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Page payload ${match}.`;

  if (page === null || expected === null)
    return {
      message,
      pass: this.equals(page, expected),
      actual: page,
      expected,
    };

  const actual = Object.fromEntries(
    Object.entries(page).filter(([key]) => isObjKeyExist(expected, key))
  );
  let pass = true;

  for (const [key, value] of Object.entries(expected)) {
    if (!isObjKeyExist(page, key)) continue;

    pass = this.equals(page[key], value);

    if (!pass) break;
  }

  return {
    pass,
    message,
    actual,
    expected,
  };
}

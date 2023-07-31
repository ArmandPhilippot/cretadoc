import { type Nullable, isObjKeyExist } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { DocDirectory, DocFile } from '../../../src/types';
import type { MatcherResult } from '../../types';

export type ToBeDocEntry = {
  toBeDocEntry: (
    expected: Partial<Nullable<DocDirectory | DocFile>>
  ) => MatcherResult;
};

export function toBeDocEntry(
  this: ReturnType<ExpectStatic['getState']>,
  entry: Nullable<DocDirectory | DocFile>,
  expected: Partial<Nullable<DocDirectory | DocFile>>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocEntry ${match}.`;

  if (entry === null || expected === null)
    return {
      message,
      pass: this.equals(entry, expected),
      actual: entry,
      expected,
    };

  const actual = Object.fromEntries(
    Object.entries(entry).filter(([key]) => isObjKeyExist(expected, key))
  );
  let pass = true;

  for (const [key, value] of Object.entries(expected)) {
    if (!isObjKeyExist(entry, key)) continue;

    pass = this.equals(entry[key], value);

    if (!pass) break;
  }

  return {
    pass,
    message,
    actual,
    expected,
  };
}

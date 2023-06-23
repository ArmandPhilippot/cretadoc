import { type Nullable, isObjKeyExist } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { DocDirectory } from '../../../src/types';
import type { MatcherResult } from '../../types';

export type ToBeDocDirectory = {
  toBeDocDirectory: (
    expected: Partial<Nullable<DocDirectory>>
  ) => MatcherResult;
};

export function toBeDocDirectory(
  this: ReturnType<ExpectStatic['getState']>,
  directory: Nullable<DocDirectory>,
  expected: Partial<Nullable<DocDirectory>>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocDirectory ${match}.`;

  if (directory === null || expected === null)
    return {
      message,
      pass: this.equals(directory, expected),
      actual: directory,
      expected,
    };

  const actual = Object.fromEntries(
    Object.entries(directory).filter(([key]) => isObjKeyExist(expected, key))
  );
  let pass = true;

  for (const [key, value] of Object.entries(expected)) {
    if (!isObjKeyExist(directory, key)) continue;

    pass = this.equals(directory[key], value);

    if (!pass) break;
  }

  return {
    pass,
    message,
    actual,
    expected,
  };
}

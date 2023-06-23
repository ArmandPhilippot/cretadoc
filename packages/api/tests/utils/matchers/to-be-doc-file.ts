import { type Nullable, isObjKeyExist } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { DocFile } from '../../../src/types';
import type { MatcherResult } from '../../types';

export type ToBeDocFile = {
  toBeDocFile: (expected: Partial<Nullable<DocFile>>) => MatcherResult;
};

export function toBeDocFile(
  this: ReturnType<ExpectStatic['getState']>,
  file: Nullable<DocFile>,
  expected: Partial<Nullable<DocFile>>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocFile ${match}.`;

  if (file === null || expected === null)
    return {
      message,
      pass: this.equals(file, expected),
      actual: file,
      expected,
    };

  const actual = Object.fromEntries(
    Object.entries(file).filter(([key]) => isObjKeyExist(expected, key))
  );
  let pass = true;

  for (const [key, value] of Object.entries(expected)) {
    if (!isObjKeyExist(file, key)) continue;

    pass = this.equals(file[key], value);

    if (!pass) break;
  }

  return {
    pass,
    message,
    actual,
    expected,
  };
}

import type { Nullable } from '@cretadoc/utils';
import type { DocFile } from '../../../src/types';
import type { MatcherResult, DocFileWithoutDates } from '../../types';

export type ToBeDocFile = {
  toBeDocFile: (expected: Nullable<DocFileWithoutDates>) => MatcherResult;
};

export function toBeDocFile(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  file: Nullable<DocFile>,
  expected: Nullable<DocFileWithoutDates>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocFile ${match}.`;

  if (file === null)
    return {
      message,
      pass: this.equals(file, expected),
      actual: file,
      expected,
    };

  const { createdAt, updatedAt, ...actual } = file;

  return {
    pass: this.equals(actual, expected),
    message,
    actual,
    expected,
  };
}

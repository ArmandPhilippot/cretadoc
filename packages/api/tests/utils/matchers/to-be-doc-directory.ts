import type { Nullable } from '@cretadoc/utils';
import type { DocDirectory } from '../../../src/types';
import type {
  MatcherResult,
  DocDirectoryWithoutDatesAndContents,
} from '../../types';

export type ToBeDocDirectory = {
  toBeDocDirectory: (
    expected: Nullable<DocDirectoryWithoutDatesAndContents>
  ) => MatcherResult;
};

export function toBeDocDirectory(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  directory: Nullable<DocDirectory>,
  expected: Nullable<DocDirectoryWithoutDatesAndContents>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocDirectory ${match}.`;

  if (directory === null)
    return {
      message,
      pass: this.equals(directory, expected),
      actual: directory,
      expected,
    };

  const { contents, createdAt, updatedAt, ...actual } = directory;

  return {
    pass: this.equals(actual, expected),
    message,
    actual,
    expected,
  };
}

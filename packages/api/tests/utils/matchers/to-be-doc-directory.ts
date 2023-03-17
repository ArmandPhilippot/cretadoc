import type { Nullable } from '@cretadoc/utils';
import type { DocDirectory } from '../../../src/types';
import type {
  MatcherResult,
  DocDirectoryWithoutDatesAndContent,
} from '../../types';

export type ToBeDocDirectory = {
  toBeDocDirectory: (
    expected: Nullable<DocDirectoryWithoutDatesAndContent>
  ) => MatcherResult;
};

export function toBeDocDirectory(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  entry: Nullable<DocDirectory>,
  expected: Nullable<DocDirectoryWithoutDatesAndContent>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocDirectory ${match}.`;

  if (entry === null)
    return {
      message,
      pass: this.equals(entry, expected),
      actual: entry,
      expected,
    };

  const isIdMatch = this.equals(entry.id, expected?.id);
  const isNameMatch = this.equals(entry.name, expected?.name);
  const isParentMatch = this.equals(entry.parent, expected?.parent);
  const isPathMatch = this.equals(entry.path, expected?.path);
  const isTypeMatch = this.equals(entry.type, expected?.type);

  return {
    pass:
      isIdMatch && isNameMatch && isParentMatch && isPathMatch && isTypeMatch,
    message,
    actual: entry,
    expected,
  };
}

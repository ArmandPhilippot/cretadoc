import type { Nullable } from '@cretadoc/utils';
import type { DocFile } from '../../../src/types';
import type { MatcherResult, DocEntryWithoutDatesAndType } from '../../types';

export type ToBeDocEntry = {
  toBeDocEntry: (
    expected: Nullable<DocEntryWithoutDatesAndType>
  ) => MatcherResult;
};

export function toBeDocEntry(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  entry: Nullable<DocFile>,
  expected: Nullable<DocEntryWithoutDatesAndType>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Doc payload ${match}.`;

  if (entry === null)
    return {
      message,
      pass: this.equals(entry, expected),
      actual: entry,
      expected,
    };

  const isContentMatch = this.equals(entry.content, expected?.content);
  const isIdMatch = this.equals(entry.id, expected?.id);
  const isNameMatch = this.equals(entry.name, expected?.name);
  const isParentMatch = this.equals(entry.parent, expected?.parent);
  const isPathMatch = this.equals(entry.path, expected?.path);

  return {
    pass:
      isContentMatch &&
      isIdMatch &&
      isNameMatch &&
      isParentMatch &&
      isPathMatch,
    message,
    actual: entry,
    expected,
  };
}

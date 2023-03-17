import type { Nullable } from '@cretadoc/utils';
import type { DocFile } from '../../../src/types';
import type { MatcherResult, DocFileWithoutDates } from '../../types';

export type ToBeDocFile = {
  toBeDocFile: (expected: Nullable<DocFileWithoutDates>) => MatcherResult;
};

export function toBeDocFile(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  entry: Nullable<DocFile>,
  expected: Nullable<DocFileWithoutDates>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocFile ${match}.`;

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
  const isTypeMatch = this.equals(entry.type, expected?.type);

  return {
    pass:
      isContentMatch &&
      isIdMatch &&
      isNameMatch &&
      isParentMatch &&
      isPathMatch &&
      isTypeMatch,
    message,
    actual: entry,
    expected,
  };
}

import type { Nullable } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { DocDirectory, DocFile } from '../../../src/types';
import type {
  MatcherResult,
  DocFileWithoutDates,
  DocDirectoryWithoutDatesAndContents,
} from '../../types';

type DirectoryEntry = Omit<DocDirectory, 'contents'> & {
  dirContents?: DocDirectory['contents'];
};

type FileEntry = Omit<DocFile, 'contents'> & {
  fileContents?: DocFile['contents'];
};

export type ToBeDocEntry = {
  toBeDocEntry: (
    expected: Nullable<
      DocDirectoryWithoutDatesAndContents | DocFileWithoutDates
    >
  ) => MatcherResult;
};

export function toBeDocEntry(
  this: ReturnType<ExpectStatic['getState']>,
  entry: Nullable<DirectoryEntry | FileEntry>,
  expected: Nullable<DocDirectoryWithoutDatesAndContents | DocFileWithoutDates>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `DocEntry ${match}.`;

  if (entry === null)
    return {
      message,
      pass: this.equals(entry, expected),
      actual: entry,
      expected,
    };

  const actual = {
    ...(entry.type === 'directory' ? {} : { contents: entry.fileContents }),
    id: entry.id,
    name: entry.name,
    parent: entry.parent,
    path: entry.path,
    type: entry.type,
  };

  return {
    pass: this.equals(actual, expected),
    message,
    actual,
    expected,
  };
}

import { type Nullable, isObjKeyExist } from '@cretadoc/utils';
import type { ExpectStatic } from 'vitest';
import type { DocDirectory, DocFile } from '../../../src/types';
import type { MatcherResult } from '../../types';

type DirectoryEntry = Omit<DocDirectory, 'contents'> & {
  dirContents?: DocDirectory['contents'];
};

type FileEntry = Omit<DocFile, 'contents'> & {
  fileContents?: DocFile['contents'];
};

export type ToBeDocEntry = {
  toBeDocEntry: (
    expected: Partial<Nullable<DirectoryEntry | FileEntry>>
  ) => MatcherResult;
};

export function toBeDocEntry(
  this: ReturnType<ExpectStatic['getState']>,
  entry: Nullable<DirectoryEntry | FileEntry>,
  expected: Partial<Nullable<DirectoryEntry | FileEntry>>
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

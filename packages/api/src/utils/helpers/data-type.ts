import { type Maybe, isObjKeyExist, isObject } from '@cretadoc/utils';
import type {
  DocDirectory,
  DocEntry,
  DocEntryKind,
  DocFile,
  NonOptionalKeysOf,
} from '../../types';

/**
 * Check if the given value is a DocEntry.
 *
 * @param {unknown} value - A value to compare.
 * @returns {boolean} True if value is a DocEntry object.
 */
export const isDocEntry = <
  K extends Maybe<DocEntryKind> = undefined,
  T extends DocEntry = K extends 'directory'
    ? DocDirectory
    : K extends 'file'
    ? DocFile
    : DocEntry
>(
  value: unknown,
  kind?: K
): value is T => {
  if (!value) return false;
  if (!isObject(value)) return false;

  const mandatoryKeys: Array<NonOptionalKeysOf<DocEntry>> = [
    'createdAt',
    'id',
    'name',
    'parent',
    'path',
    'slug',
    'type',
    'updatedAt',
  ];

  for (const key of mandatoryKeys) if (!isObjKeyExist(value, key)) return false;

  return kind ? value['type'] === kind : true;
};

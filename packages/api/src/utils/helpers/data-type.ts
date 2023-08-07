import { type Maybe, isObjKeyExist, isObject } from '@cretadoc/utils';
import type {
  DocDirectory,
  DocEntry,
  DocEntryKind,
  DocFile,
  NonOptionalKeysOf,
  Page,
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

/**
 * Check if the given value is a Page.
 *
 * @param {unknown} value - A value to compare.
 * @returns {boolean} True if value is a Page object.
 */
export const isPage = (value: unknown): value is Page => {
  if (!value) return false;
  if (!isObject(value)) return false;

  const mandatoryKeys: Array<NonOptionalKeysOf<Page>> = [
    'createdAt',
    'id',
    'name',
    'path',
    'slug',
    'updatedAt',
  ];

  for (const key of mandatoryKeys) if (!isObjKeyExist(value, key)) return false;

  return true;
};

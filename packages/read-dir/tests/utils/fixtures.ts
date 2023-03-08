/* eslint-disable no-await-in-loop */
import { writeFileSync } from 'fs';
import { access, mkdir, symlink } from 'fs/promises';
import { parse } from 'path';
import type { ValidFileType } from '../../src/types';

/**
 * Check if a path exists.
 *
 * @param path - A path.
 * @returns {Promise<Boolean>} True if the path exists.
 */
const isPathExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export type Fixture<T extends ValidFileType> = {
  /**
   * The file content.
   */
  content?: T extends 'file' ? string : never;
  /**
   * The absolute path.
   */
  path: string;
  /**
   * The symlink path if you want to create one.
   */
  symlinkTo?: string;
  /**
   * The file type.
   */
  type: T;
};

const createDirectoryFixture = async (path: string) => {
  const isExist = await isPathExists(path);

  if (!isExist) await mkdir(path, { recursive: true });
};

const createFileFixture = async (path: string, content: string | undefined) => {
  const isFileExist = await isPathExists(path);

  if (isFileExist) return;

  const parentDir = parse(path).dir;
  const isParentExist = await isPathExists(parentDir);

  if (!isParentExist) await createDirectoryFixture(parentDir);

  writeFileSync(path, content ?? '', { encoding: 'utf8' });
};

export const createFixtures = async (
  fixtures: Array<Fixture<'directory'> | Fixture<'file'>>
) => {
  for (const fixture of fixtures) {
    if (fixture.type === 'directory')
      await createDirectoryFixture(fixture.path);
    else await createFileFixture(fixture.path, fixture.content);

    if (fixture.symlinkTo) await symlink(fixture.path, fixture.symlinkTo);
  }
};

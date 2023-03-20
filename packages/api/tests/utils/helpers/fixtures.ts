/* eslint-disable no-await-in-loop */
import { writeFileSync } from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import { parse } from 'path';

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

export type Fixture = {
  /**
   * The file contents.
   */
  contents?: string;
  /**
   * The absolute path.
   */
  path: string;
};

const createDirectoryFixture = async (path: string) => {
  const isExist = await isPathExists(path);

  if (!isExist) await mkdir(path, { recursive: true });
};

const createFileFixture = async (
  path: string,
  contents: string | undefined
) => {
  const isFileExist = await isPathExists(path);

  if (isFileExist) return;

  const parentDir = parse(path).dir;
  const isParentExist = await isPathExists(parentDir);

  if (!isParentExist) await createDirectoryFixture(parentDir);

  writeFileSync(path, contents ?? '', { encoding: 'utf8' });
};

export const createFixtures = async (fixtures: Fixture[]) => {
  for (const fixture of fixtures)
    await createFileFixture(fixture.path, fixture.contents);
};

/**
 * Delete a fixtures path recursively.
 *
 * @param {string} path - The fixture path.
 * @returns {Promise<void>}
 */
export const deletePath = async (path: string): Promise<void> => {
  await rm(path, { recursive: true, force: true });
};

/**
 * Delete fixtures.
 *
 * @returns {Promise<void>}
 */
export const cleanFixtures = async (path: string): Promise<void> => {
  await deletePath(path);
};

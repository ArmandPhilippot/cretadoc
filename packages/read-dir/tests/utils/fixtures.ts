/* eslint-disable no-await-in-loop */
import { writeFileSync } from 'fs';
import { mkdir, symlink } from 'fs/promises';
import { parse } from 'path';
import { isValidPath } from '@cretadoc/utils';
import type { ValidFileType } from '../../src/types';

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
  if (await isValidPath(path)) return;

  await mkdir(path, { recursive: true });
};

const createFileFixture = async (path: string, content: string | undefined) => {
  if (await isValidPath(path)) return;

  const parentDir = parse(path).dir;
  const isParentExist = await isValidPath(parentDir);

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

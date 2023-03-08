/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { rm } from 'fs/promises';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { type Directory, readDir, type RegularFile } from '../src';
import { generateIdFrom } from '../src/utils/helpers/strings';
import { createFixtures, type Fixture } from './utils/fixtures';
import { getRootFixturesFrom } from './utils/helpers';

const currentPath = fileURLToPath(import.meta.url);
const dirPath = dirname(currentPath);
const fixturesPath = join(dirPath, './fixtures/');
const directoriesFixture: Array<Fixture<'directory'>> = [
  { path: join(fixturesPath, './qui'), type: 'directory' },
  { path: join(fixturesPath, './commodi'), type: 'directory' },
  {
    path: join(fixturesPath, './ipsa'),
    symlinkTo: join(fixturesPath, './dir-symlink'),
    type: 'directory',
  },
  { path: join(fixturesPath, './ipsa/numquam'), type: 'directory' },
  { path: join(fixturesPath, './ipsa/commodi'), type: 'directory' },
];
const readmeContent = '# Cretadoc auto-generated fixture';
const filesFixture: Array<Fixture<'file'>> = [
  {
    path: join(fixturesPath, './tenetur.txt'),
    symlinkTo: join(fixturesPath, './symlink.txt'),
    type: 'file',
  },
  {
    content: readmeContent,
    path: join(fixturesPath, './README.md'),
    type: 'file',
  },
  { path: join(fixturesPath, './aut.js'), type: 'file' },
  { path: join(fixturesPath, './.prettierrc'), type: 'file' },
  { path: join(fixturesPath, './qui/nested.txt'), type: 'file' },
  { path: join(fixturesPath, './commodi/nested.md'), type: 'file' },
  { path: join(fixturesPath, './ipsa/commodi/atque.json'), type: 'file' },
];
const rootDirectories = getRootFixturesFrom(directoriesFixture, fixturesPath);
const rootFiles = getRootFixturesFrom(filesFixture, fixturesPath);

describe('read-dir', () => {
  beforeAll(async () => {
    await createFixtures([...directoriesFixture, ...filesFixture]);
  });

  afterAll(async () => {
    await rm(fixturesPath, { recursive: true, force: true });
  });

  it('throws an error if the path does not exist', async () => {
    await expect(async () =>
      readDir('./non-existing-path')
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('throws an error if the path is a file', async () => {
    await expect(async () =>
      readDir(join(dirPath, './read-dir.spec.ts'))
    ).rejects.toThrowError();
    expect.assertions(1);
  });

  it('returns the directory data', async () => {
    const dir = await readDir(fixturesPath);

    expect(dir.content?.directories.length).toBe(rootDirectories.length);
    expect(dir.content?.files.length).toBe(rootFiles.length);
    expect(dir.createdAt).toBeTruthy();
    expect(dir.id).toBe(generateIdFrom(fixturesPath));
    expect(dir.name).toBe(basename(fixturesPath));
    expect(dir.path).toBe(fixturesPath);
    expect(dir.type).toBe('directory');
    expect(dir.updatedAt).toBeTruthy();
    expect.assertions(8);
  });

  it('returns the files contents if the option is set', async () => {
    const dir = await readDir(fixturesPath, { includeFileContents: true });

    expect(dir.content?.files.every((file) => file.content !== undefined)).toBe(
      true
    );
    expect(
      dir.content?.files.find((file) => file.name === 'README')?.content ===
        readmeContent
    ).toBe(true);
    expect.assertions(2);
  });

  it('returns only files with the given extensions', async () => {
    const markdownExtension = '.md';
    const dir = await readDir(fixturesPath, {
      extensions: [markdownExtension],
    });
    const isMarkdownFile = (file: RegularFile) =>
      file.extension === markdownExtension;
    const isDirOnlyHasMarkdownFiles = (subDir: Directory) =>
      subDir.content?.files.every(isMarkdownFile);

    expect(dir.content?.files.every(isMarkdownFile)).toBe(true);
    expect(dir.content?.directories.every(isDirOnlyHasMarkdownFiles)).toBe(
      true
    );
    expect.assertions(2);
  });

  it('respects the given depth limit', async () => {
    const rootDirOnly = await readDir(fixturesPath, {
      depth: 0,
    });

    expect(rootDirOnly.content).toBeUndefined();

    const rootDirAndDirectChildren = await readDir(fixturesPath, {
      depth: 1,
    });

    expect(rootDirAndDirectChildren.content?.directories.length).toBe(
      rootDirectories.length
    );
    expect(rootDirAndDirectChildren.content?.files.length).toBe(
      rootFiles.length
    );
    expect(
      rootDirAndDirectChildren.content?.directories.every(
        (subDir) => subDir.content === undefined
      )
    ).toBe(true);

    expect.assertions(4);
  });
});

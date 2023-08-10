import { writeFileSync } from 'fs';
import { access, mkdir, readdir, rm } from 'fs/promises';
import { join, parse } from 'path';

type DebugOptions = {
  verbose?: boolean;
};

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

/**
 * Create a new directory.
 *
 * @param {string} path - The directory path.
 */
const createDirectory = async (path: string) => {
  const isExist = await isPathExists(path);

  if (!isExist) await mkdir(path, { recursive: true });
};

/**
 * Create a new file.
 *
 * @param {string} path - The file path.
 * @param {string} contents - The file contents.
 */
const createFile = async (path: string, contents: string) => {
  const fixture = parse(path);
  await createDirectory(fixture.dir);
  writeFileSync(path, contents, { encoding: 'utf8' });
};

/**
 * Add a new fixture.
 *
 * @param {Fixture} fixture - The fixture to add.
 * @returns {Promise<void>}
 */
const add = async (
  { path, contents }: Fixture,
  options?: DebugOptions
): Promise<void> => {
  const isFileExist = await isPathExists(path);

  if (isFileExist) {
    if (options?.verbose)
      console.log(`[fixtures]: ${path} already exists, skipping.`);
    return;
  }

  await createFile(path, contents ?? '');
  if (options?.verbose) console.log(`[fixtures]: ${path} added.`);
};

/**
 * Create the given fixtures in fixtures directory.
 *
 * @param {Fixture[]} fixtures - The fixtures to create.
 * @param {DebugOptions} [options] - Some debug options.
 */
export const createFixtures = async (
  fixtures: Fixture[],
  options?: DebugOptions
) => {
  const promises = fixtures.map(async (fixture) => add(fixture, options));

  await Promise.all(promises);
};

/**
 * Remove the given path recursively.
 *
 * @param {string} path - The path to remove.
 * @param {DebugOptions} [options] - Some debug options.
 */
const remove = async (path: string, options?: DebugOptions): Promise<void> => {
  await rm(path, { recursive: true, force: true });
  if (options?.verbose) console.log(`[fixtures]: ${path} removed.`);
};

/**
 * Delete all the fixtures in the given path recursively.
 *
 * @param {string} path - A directory path.
 * @param {DebugOptions} [options] - Some debug options.
 */
export const deleteFixturesIn = async (
  path: string,
  options?: DebugOptions
) => {
  const dirContents = await readdir(path, {
    withFileTypes: true,
  });
  const promises = dirContents.map(async (contents) => {
    if (contents.isFile() && contents.name === '.keep') return undefined;
    return remove(join(path, contents.name), options);
  });

  await Promise.all(promises);
};

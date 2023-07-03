import { writeFileSync } from 'fs';
import { access, rm } from 'fs/promises';
import { join } from 'path';
import { MARKDOWN_EXT } from '../../../src/utils/constants';

export type Fixture = {
  /**
   * The file contents.
   */
  contents?: string;
  /**
   * The file name without extension.
   */
  name: string;
};

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

/**
 * Log the given message.
 *
 * @param {string} message - The message to log.
 * @param {DebugOptions} [options] - An object with verbose option.
 */
const log = (message: string, options?: DebugOptions) => {
  if (options?.verbose) console.log(`[fixtures]: ${message}`);
};

/**
 * Add a new fixture.
 *
 * @param {Fixture} fixture - The fixture to add.
 * @param {string} dirPath - The path where to add a fixture.
 * @param {DebugOptions} [options] - Some debug options.
 * @returns {Promise<void>}
 */
const add = async (
  fixture: Fixture,
  dirPath: string,
  options?: DebugOptions
): Promise<void> => {
  const fixturePath = join(dirPath, `${fixture.name}${MARKDOWN_EXT}`);
  const isFileExist = await isPathExists(fixturePath);

  if (isFileExist) {
    log(`${fixture.name} already exist in ${dirPath}, skipping.`, options);
    return;
  }

  writeFileSync(fixturePath, fixture.contents ?? '', { encoding: 'utf8' });
  log(`${fixture.name} added in ${dirPath}`, options);
};

/**
 * Create the given fixtures in fixtures directory.
 *
 * @param {Fixture[]} fixtures - The fixtures to create.
 * @param {string} path - The path where to create the fixtures.
 * @param {DebugOptions} [options] - Some debug options.
 */
export const createFixtures = async (
  fixtures: Fixture[],
  path: string,
  options?: DebugOptions
) => {
  const promises = fixtures.map(async (fixture) => add(fixture, path, options));

  await Promise.all(promises);
};

/**
 * Remove the given fixture.
 *
 * @param {Fixture} fixture - The fixture to remove.
 * @param {string} dirPath - The path where to remove the fixture.
 * @param {DebugOptions} [options] - Some debug options.
 */
const remove = async (
  fixture: Fixture,
  dirPath: string,
  options?: DebugOptions
): Promise<void> => {
  const fixturePath = join(dirPath, `${fixture.name}${MARKDOWN_EXT}`);

  await rm(fixturePath, { recursive: true, force: true });

  log(`${fixture.name} removed from ${dirPath}`, options);
};

/**
 * Delete the given fixtures in the fixtures path.
 *
 * @param {Fixture[]} fixtures - The fixtures to delete.
 * @param {string} path - The path where to delete the fixtures.
 * @param {DebugOptions} [options] - Some debug options.
 */
export const deleteFixtures = async (
  fixtures: Fixture[],
  path: string,
  options?: DebugOptions
) => {
  const promises = fixtures.map(async (fixture) =>
    remove(fixture, path, options)
  );

  await Promise.all(promises);
};

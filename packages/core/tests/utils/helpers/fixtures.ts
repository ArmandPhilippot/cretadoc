import { writeFileSync } from 'fs';
import { access, rm } from 'fs/promises';
import { join } from 'path';
import type { Page } from '@cretadoc/api';
import { PAGES_FIXTURES_DIR_PATH } from '../constants';

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
 * Retrieve the fixture absolute path from its filename (without extension).
 *
 * @param {string} name - The filename.
 * @returns {string} The fixture path.
 */
const getFixturePathFrom = (name: string): string =>
  join(PAGES_FIXTURES_DIR_PATH, `${name}.md`);

export type Fixture = Pick<Page, 'contents' | 'name'>;

/**
 * Add a new fixture.
 *
 * @param {Fixture} fixture - The fixture to add.
 * @returns {Promise<void>}
 */
const add = async (fixture: Fixture): Promise<void> => {
  const fixturePath = getFixturePathFrom(fixture.name);
  const isFileExist = await isPathExists(fixturePath);

  if (isFileExist) {
    console.log(
      `[fixtures]: ${fixture.name} already exist in ${PAGES_FIXTURES_DIR_PATH}, skipping.`
    );
    return;
  }

  writeFileSync(fixturePath, fixture.contents ?? '', { encoding: 'utf8' });
  console.log(
    `[fixtures]: ${fixture.name} added in ${PAGES_FIXTURES_DIR_PATH}`
  );
};

/**
 * Create the given fixtures in fixtures directory.
 *
 * @param {Fixture[]} fixtures - The fixtures to create.
 */
export const createFixtures = async (fixtures: Fixture[]) => {
  const promises = fixtures.map(async (fixture) => add(fixture));

  await Promise.all(promises);
};

/**
 * Remove the given fixture.
 *
 * @param {Fixture} fixture - The fixture to remove.
 */
const remove = async (fixture: Fixture): Promise<void> => {
  const fixturePath = getFixturePathFrom(fixture.name);
  await rm(fixturePath, { recursive: true, force: true });
  console.log(
    `[fixtures]: ${fixture.name} removed from ${PAGES_FIXTURES_DIR_PATH}`
  );
};

/**
 * Delete the given fixtures in the fixtures path.
 *
 * @param {Fixture[]} fixtures - The fixtures to delete.
 */
export const deleteFixtures = async (fixtures: Fixture[]) => {
  const promises = fixtures.map(async (fixture) => remove(fixture));

  await Promise.all(promises);
};

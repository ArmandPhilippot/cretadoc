import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { Page, PageInput } from '../../../types';
import type { PagesRepository } from '../pages.repository';

/**
 * Retrieve many pages using values to looking for in a property.
 *
 * @param {PageRepository} repository - The Page repository.
 * @param {P} prop - The property where to look for matching pages.
 * @param {readonly PageInput[P][]} values - The values to looking for.
 * @returns {Promise<(Maybe<Page>)[]>} The matching pages.
 */
const getPageBy = async <P extends keyof PageInput>(
  repository: PagesRepository,
  prop: P,
  values: ReadonlyArray<PageInput[P]>
): Promise<Array<Maybe<Page>>> => {
  const pages = await repository.getMany(prop, values);

  return values.map((value) => pages?.find((page) => page[prop] === value));
};

/**
 * Retrieve many pages by id.
 *
 * @param {PageRepository} repository - A Page repository.
 * @returns {DataLoader<string, Maybe<Page>, string>} The Data Loader.
 */
export const getPageById = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['id'], Maybe<Page>>(async (ids) =>
    getPageBy(repository, 'id', ids)
  );

/**
 * Retrieve many pages by name.
 *
 * @param {PageRepository} repository - A Page repository.
 * @returns {DataLoader<string, Maybe<Page>, string>} The Data Loader.
 */
export const getPageByName = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['name'], Maybe<Page>>(async (names) =>
    getPageBy(repository, 'name', names)
  );

/**
 * Retrieve many pages by slug.
 *
 * @param {PageRepository} repository - A Page repository.
 * @returns {DataLoader<string, Maybe<Page>, string>} The Data Loader.
 */
export const getPageBySlug = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['slug'], Maybe<Page>>(async (slugs) =>
    getPageBy(repository, 'slug', slugs)
  );

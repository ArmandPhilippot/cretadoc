import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { PagesRepository } from '../../../repositories';
import type { Page, PageInput } from '../../../types';

/**
 * Retrieve many pages using values to looking for in a property.
 *
 * @param {PageRepository} repository - The Page repository.
 * @param {P} prop - The property where to look for matching pages.
 * @param {readonly PageInput[P][]} values - The values to looking for.
 * @returns {Promise<(Maybe<Page>)[]>} The matching pages.
 */
const loadPageBy = async <P extends keyof PageInput>(
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
export const loadPageById = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['id'], Maybe<Page>>(async (ids) =>
    loadPageBy(repository, 'id', ids)
  );

/**
 * Retrieve many pages by name.
 *
 * @param {PageRepository} repository - A Page repository.
 * @returns {DataLoader<string, Maybe<Page>, string>} The Data Loader.
 */
export const loadPageByName = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['name'], Maybe<Page>>(async (names) =>
    loadPageBy(repository, 'name', names)
  );

/**
 * Retrieve many pages by slug.
 *
 * @param {PageRepository} repository - A Page repository.
 * @returns {DataLoader<string, Maybe<Page>, string>} The Data Loader.
 */
export const loadPageBySlug = (
  repository: PagesRepository
): DataLoader<string, Maybe<Page>, string> =>
  new DataLoader<PageInput['slug'], Maybe<Page>>(async (slugs) =>
    loadPageBy(repository, 'slug', slugs)
  );

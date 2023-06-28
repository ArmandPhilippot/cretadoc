import type { Maybe } from '@cretadoc/utils';
import DataLoader from 'dataloader';
import type { PagesRepository } from '../../repositories';
import type { ListInput, Page, PageInput, PageLoaders } from '../../types';

/**
 * Use the repository to look for pages.
 *
 * @param {PagesRepository} repository - The Page repository.
 */
const use = (repository: PagesRepository) => {
  return {
    /**
     * Retrieve many pages by looking for values in a property.
     *
     * @param {P} prop - The property where to look for matching pages.
     * @param {ReadonlyArray<PageInput[P]>} values - The values to look for.
     * @returns {Promise<Array<Maybe<Page>>>} The matching pages.
     */
    getPagesBy: async <P extends keyof PageInput>(
      prop: P,
      values: ReadonlyArray<PageInput[P]>
    ): Promise<Array<Maybe<Page>>> => {
      const pages = await repository.getMany(prop, values);

      return values.map((value) => pages?.find((page) => page[prop] === value));
    },
  };
};

/**
 * Initialize the page loaders.
 *
 * @param {PageRepository} repository - The Page repository.
 * @returns {PageLoaders} The page loaders.
 */
export const initPageLoaders = (repository: PagesRepository): PageLoaders => {
  return {
    page: {
      byId: new DataLoader<PageInput['id'], Maybe<Page>>(async (ids) =>
        use(repository).getPagesBy('id', ids)
      ),
      byName: new DataLoader<PageInput['name'], Maybe<Page>>(async (names) =>
        use(repository).getPagesBy('name', names)
      ),
      bySlug: new DataLoader<PageInput['slug'], Maybe<Page>>(async (slugs) =>
        use(repository).getPagesBy('slug', slugs)
      ),
      list: async (params: ListInput<Page>) => repository.find(params),
    },
  };
};

/**
 * Clear the page loaders.
 *
 * @param {NonNullable<PageLoaders['page']>} pageLoaders - The page loaders.
 * @param {PageInput} input - The page id, name and slug.
 */
export const clearPageLoaders = (
  pageLoaders: NonNullable<PageLoaders['page']>,
  { id, name, slug }: PageInput
) => {
  pageLoaders.byId.clear(id);
  pageLoaders.byName.clear(name);
  pageLoaders.bySlug.clear(slug);
};

import { usePages } from '../use-pages';

export type UsePagesListOptions = {
  /**
   * Define the pages to exclude.
   */
  exclude?: {
    /**
     * Exclude pages by name.
     */
    names?: string[];
    /**
     * Exclude pages by slug.
     */
    slugs?: string[];
  };
};

/**
 * Custom hook to retrieve the pages list.
 *
 * @param {UsePagesListOptions} [options] - Some options to exclude pages.
 * @returns An object with the pages list.
 */
export const usePagesList = (options?: UsePagesListOptions) => {
  const { info } = usePages({ first: 1 });
  const { isLoading, isValidating, isError, pages } = usePages({
    first: info?.total ?? 1,
  });

  const pagesFilteredByName = options?.exclude?.names
    ? pages?.filter((page) => !options.exclude?.names?.includes(page.name))
    : pages;

  const pagesFilteredByPath = options?.exclude?.slugs
    ? pages?.filter((page) => !options.exclude?.slugs?.includes(page.slug))
    : pagesFilteredByName;

  return { isLoading, isValidating, isError, pages: pagesFilteredByPath };
};

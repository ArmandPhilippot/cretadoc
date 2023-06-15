import type { Edge, Page } from '@cretadoc/api';
import type { Maybe, Nullable } from '@cretadoc/utils';
import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, pagesQuery } from '../../../services';
import type { APIResponse, CretadocPages } from '../../../types';
import { ROUTES } from '../../constants';
import { useConfig } from '../use-config';

const sortPages = (pages: Page[]) => {
  const homepage = pages.find((page) => page.slug === ROUTES.HOMEPAGE);
  const restPages = pages.filter((page) => page.slug !== ROUTES.HOMEPAGE);

  return [...(homepage ? [homepage] : []), ...restPages];
};

const getPagesFrom = (
  edges: Maybe<Nullable<Array<Edge<Page>>>>,
  config: CretadocPages
): Maybe<Page[]> => {
  if (!edges) return undefined;

  const pages = edges.map((edge) => {
    return {
      ...edge.node,
      slug:
        edge.node.name === config.homepage ? ROUTES.HOMEPAGE : edge.node.slug,
    };
  });

  return sortPages(pages);
};

/**
 * Custom hook to retrieve an array of pages from the API.
 *
 * @param variables - The variables.
 * @returns An object with pages list.
 */
export const usePages = (
  variables?: FetchAPIProps<typeof pagesQuery>['variables']
) => {
  const { pages: config } = useConfig();
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof pagesQuery>,
    Error
  >({ query: pagesQuery, variables }, fetchAPI<typeof pagesQuery>);

  if (error) console.error(error);

  return {
    errors: data?.errors,
    info: data?.data?.pages?.pageInfo,
    isError: !!error,
    isLoading,
    isValidating,
    pages: getPagesFrom(data?.data?.pages?.edges, config),
  };
};

import type { Page } from '@cretadoc/api';
import { type Maybe, slugify } from '@cretadoc/utils';
import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, pagesQuery } from '../../../services';
import type { APIResponse } from '../../../types';

export type PageWithSlug = Page & { slug: string };

/**
 * Custom hook to retrieve the pages list from the API.
 *
 * @param variables - The variables.
 * @returns An object with pages list.
 */
export const usePagesList = (
  variables?: FetchAPIProps<typeof pagesQuery>['variables']
) => {
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof pagesQuery>,
    Error
  >({ query: pagesQuery, variables }, fetchAPI<typeof pagesQuery>);

  const pages: Maybe<PageWithSlug[]> = data?.data?.pages?.edges?.map((page) => {
    return {
      ...page.node,
      slug: `/${slugify(page.node.name)}`,
    };
  });

  if (error) console.error(error);

  return {
    errors: data?.errors,
    info: data?.data?.pages?.pageInfo,
    isError: !!error,
    isLoading,
    isValidating,
    pages,
  };
};

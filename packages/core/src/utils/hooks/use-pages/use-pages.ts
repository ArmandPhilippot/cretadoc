import type { Maybe } from '@cretadoc/utils';
import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, pagesQuery } from '../../../services';
import type { APIResponse, PageWithSlug } from '../../../types';
import { getPagesWithSlug } from '../../helpers';

/**
 * Custom hook to retrieve an array of pages from the API.
 *
 * @param variables - The variables.
 * @returns An object with pages list.
 */
export const usePages = (
  variables?: FetchAPIProps<typeof pagesQuery>['variables']
) => {
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof pagesQuery>,
    Error
  >({ query: pagesQuery, variables }, fetchAPI<typeof pagesQuery>);

  const pages: Maybe<PageWithSlug[]> = data?.data?.pages?.edges
    ? getPagesWithSlug(data.data.pages.edges)
    : undefined;

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
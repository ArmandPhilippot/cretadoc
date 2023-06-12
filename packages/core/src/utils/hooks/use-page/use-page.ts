import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, pageQuery } from '../../../services';
import type { APIResponse } from '../../../types';

/**
 * Custom hook to retrieve a page from the API.
 *
 * @param variables - The variables.
 * @returns An object with the maybe the queried page.
 */
export const usePage = (
  variables?: FetchAPIProps<typeof pageQuery>['variables']
) => {
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof pageQuery>,
    Error
  >({ query: pageQuery, variables }, fetchAPI<typeof pageQuery>);

  if (error) console.error(error);

  return {
    errors: data?.errors,
    isError: !!error,
    isLoading,
    isValidating,
    page: data?.data?.page,
  };
};

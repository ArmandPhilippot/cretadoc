import useSWR from 'swr';
import {
  type FetchAPIProps,
  fetchAPI,
  docEntriesQuery,
} from '../../../services';
import type { APIResponse } from '../../../types';

/**
 * Custom hook to retrieve documentation entries from the API.
 *
 * @param variables - The variables.
 * @returns An object with the maybe the queried entries.
 */
export const useDocEntries = (
  variables: FetchAPIProps<typeof docEntriesQuery>['variables'],
  fallbackData?: APIResponse<typeof docEntriesQuery>
) => {
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof docEntriesQuery>,
    Error
  >(
    variables ? { query: docEntriesQuery, variables } : null,
    fetchAPI<typeof docEntriesQuery>,
    {
      fallbackData,
    }
  );

  if (error) console.error(error);

  return {
    errors: data?.errors,
    isError: !!error,
    isLoading,
    isValidating,
    docEntries: data?.data?.doc?.entries,
  };
};

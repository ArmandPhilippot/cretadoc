import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, docEntryQuery } from '../../../services';
import type { APIResponse } from '../../../types';

/**
 * Custom hook to retrieve a documentation entry from the API.
 *
 * @param variables - The variables.
 * @returns An object with the maybe the queried entry.
 */
export const useDocEntry = (
  variables: FetchAPIProps<typeof docEntryQuery>['variables'],
  fallbackData?: APIResponse<typeof docEntryQuery>
) => {
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof docEntryQuery>,
    Error
  >(
    variables ? { query: docEntryQuery, variables } : null,
    fetchAPI<typeof docEntryQuery>,
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
    docEntry: data?.data?.doc?.entry,
  };
};

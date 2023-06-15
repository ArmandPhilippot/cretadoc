import useSWR from 'swr';
import { type FetchAPIProps, fetchAPI, pageQuery } from '../../../services';
import type { APIResponse } from '../../../types';
import { ROUTES } from '../../constants';
import { useConfig } from '../use-config';

/**
 * Custom hook to retrieve a page from the API.
 *
 * @param variables - The variables.
 * @returns An object with the maybe the queried page.
 */
export const usePage = (
  variables: FetchAPIProps<typeof pageQuery>['variables'],
  fallbackData?: APIResponse<typeof pageQuery>
) => {
  const { pages: config } = useConfig();
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<typeof pageQuery>,
    Error
  >(
    variables ? { query: pageQuery, variables } : null,
    fetchAPI<typeof pageQuery>,
    {
      fallbackData,
    }
  );

  if (error) console.error(error);

  const page = data?.data?.page
    ? {
        ...data.data.page,
        slug:
          data.data.page.name === config.homepage
            ? ROUTES.HOMEPAGE
            : data.data.page.slug,
      }
    : undefined;

  return {
    errors: data?.errors,
    isError: !!error,
    isLoading,
    isValidating,
    page,
  };
};

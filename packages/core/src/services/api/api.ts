import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { APIResponse, Queries, VariablesMap } from '../../types';
import { ROUTES } from '../../utils/constants';
import { ApiError } from '../../utils/exceptions';

/**
 * Check if the fetch response is valid.
 *
 * @param {unknown} response - The fetch response.
 * @returns {boolean} True if the response is valid.
 */
const isValidAPIResponse = <Q extends Queries>(
  response: unknown
): response is APIResponse<Q> => {
  if (!isObject(response)) return false;
  if (!isObjKeyExist(response, 'data') && !isObjKeyExist(response, 'errors'))
    return false;
  return true;
};

export type FetchAPIProps<Q extends Queries> = {
  query: Q;
  variables?: VariablesMap[Q];
};

/**
 * Fetch the Cretadoc API.
 *
 * @param {FetchAPIProps<Q>} props - The query and maybe variables.
 * @param {string} baseUrl - The protocol, host and port as string.
 * @returns {Promise<APIResponse<Q>>} The response.
 */
export const fetchAPI = async <Q extends Queries>(
  { query, variables }: FetchAPIProps<Q>,
  baseUrl?: string
): Promise<APIResponse<Q>> => {
  const apiOrigin = baseUrl ?? window.location.origin;
  const response = await fetch(new URL(ROUTES.API, apiOrigin), {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const jsonResponse: unknown = await response.json();

  if (!isValidAPIResponse<Q>(jsonResponse))
    throw new ApiError('Received an invalid response from the API.');

  if (response.ok) {
    if (!jsonResponse.data)
      return Promise.reject(new ApiError('No data found'));

    return jsonResponse;
  }

  console.error('Failed to fetch API');
  const error = new ApiError(
    jsonResponse.errors?.map((e) => e.message).join('\n') ?? 'unknown'
  );

  return Promise.reject(error);
};

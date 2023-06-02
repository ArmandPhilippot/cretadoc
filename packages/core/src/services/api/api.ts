import { isObjKeyExist, isObject } from '@cretadoc/utils';
import { ERROR, ROUTES } from '../../utils/constants';
import { ApiError } from '../../utils/exceptions';

type APIResponse = {
  data?: [];
  errors?: Array<{ message: string }>;
};

const isValidAPIResponse = (response: unknown): response is APIResponse => {
  if (!isObject(response)) return false;
  if (!isObjKeyExist(response, 'data') && !isObjKeyExist(response, 'errors'))
    return false;
  return true;
};

export type FetchAPIProps = {
  query: string;
  variables?: Record<string, unknown>;
};

export const fetchAPI = async ({ query, variables }: FetchAPIProps) => {
  const response = await fetch(new URL(ROUTES.API, window.location.origin), {
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

  if (!isValidAPIResponse(jsonResponse)) throw new ApiError(ERROR.UNEXPECTED);

  if (response.ok) {
    if (!jsonResponse.data) return Promise.reject(new ApiError(ERROR.API.DATA));

    return jsonResponse;
  }

  console.error(ERROR.API.RESPONSE);
  const error = new ApiError(
    jsonResponse.errors?.map((e) => e.message).join('\n') ?? 'unknown'
  );

  return Promise.reject(error);
};

import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { docEntriesQuery, fetchAPI } from '../../services';
import type { APIResponse } from '../../types';
import { PER_PAGE } from '../../utils/constants';

export const docEntriesLoader = async ({
  params,
  request,
}: LoaderFunctionArgs): Promise<APIResponse<typeof docEntriesQuery>> => {
  const url = new URL(request.url);
  const { page } = params;
  const pageNumber = page ? Number(page) : undefined;
  const response = await fetchAPI(
    {
      query: docEntriesQuery,
      variables: {
        first: PER_PAGE,
        offset:
          pageNumber && pageNumber > 1
            ? (pageNumber - 1) * PER_PAGE
            : undefined,
        orderBy: { direction: 'ASC', field: 'name' },
      },
    },
    url.origin
  );

  if (!response.data?.doc?.entries)
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(url.href, { status: HTTP_STATUS_CODE.NOT_FOUND });

  return response;
};

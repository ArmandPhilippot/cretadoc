import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { fetchAPI, pageQuery } from '../../services';
import type { APIResponse } from '../../types';

export const pagesLoader = async ({
  params,
  request,
}: LoaderFunctionArgs): Promise<APIResponse<typeof pageQuery>> => {
  const slug = params['slug'] ?? 'homepage';
  const url = new URL(request.url);
  const response = await fetchAPI(
    {
      query: pageQuery,
      variables: { slug: `/${slug}` },
    },
    url.origin
  );

  if (!response.data?.page)
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(url.href, { status: HTTP_STATUS_CODE.NOT_FOUND });

  return response;
};

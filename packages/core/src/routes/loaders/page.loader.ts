import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { fetchAPI, pageQuery } from '../../services';
import type { APIResponse } from '../../types';
import { ROUTES } from '../../utils/constants';

export const pageLoader = async ({
  params,
  request,
}: LoaderFunctionArgs): Promise<APIResponse<typeof pageQuery>> => {
  const slug = params['slug'] ?? '';
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
    throw redirect(ROUTES.NOT_FOUND);

  return response;
};

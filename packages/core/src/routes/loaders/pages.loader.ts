import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { fetchAPI, pageQuery } from '../../services';
import type { APIResponse, CretadocClientConfig } from '../../types';

export type PagesLoaderProps = LoaderFunctionArgs &
  Pick<CretadocClientConfig, 'pages'>;

export const pagesLoader = async ({
  pages,
  params,
  request,
}: PagesLoaderProps): Promise<APIResponse<typeof pageQuery>> => {
  const url = new URL(request.url);
  const response = await fetchAPI(
    {
      query: pageQuery,
      variables: params['slug']
        ? { slug: `/${params['slug']}` }
        : { name: pages.homepage },
    },
    url.origin
  );

  if (!response.data?.page)
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(url.href, { status: HTTP_STATUS_CODE.NOT_FOUND });

  return response;
};

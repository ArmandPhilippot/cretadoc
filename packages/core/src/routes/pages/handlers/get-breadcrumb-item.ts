import type { Page } from '@cretadoc/api';
import type { BreadcrumbsItem } from '@cretadoc/ui';
import type { Maybe } from '@cretadoc/utils';

type PagesLoaderResponse = {
  data: {
    page: Page;
  };
};

const isPageExist = (
  res: Maybe<PagesLoaderResponse>
): res is PagesLoaderResponse => !!res?.data.page;

export const getBreadcrumbItem = (
  response: Maybe<PagesLoaderResponse>
): BreadcrumbsItem => {
  if (isPageExist(response))
    return {
      id: response.data.page.id,
      label: response.data.page.name,
      url: response.data.page.slug,
    };

  return {
    id: 'page-not-found',
    label: 'Page not found',
    url: '/404',
  };
};

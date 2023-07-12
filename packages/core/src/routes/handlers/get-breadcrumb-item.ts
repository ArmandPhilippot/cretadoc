import type { PagePayload } from '@cretadoc/api';
import type { BreadcrumbsItem } from '@cretadoc/ui';
import { isObject, isObjKeyExist } from '@cretadoc/utils';
import { ROUTES } from '../../utils/constants';

type APIPayload<T> = {
  data: T;
};

const isAPIPayload = (
  response: unknown
): response is APIPayload<Record<PropertyKey, unknown>> => {
  if (!isObject(response)) return false;
  if (!isObjKeyExist(response, 'data')) return false;
  if (!isObject(response.data)) return false;
  return true;
};

const isPagePayload = (
  response: APIPayload<Record<PropertyKey, unknown>>
): response is APIPayload<PagePayload> => isObjKeyExist(response.data, 'page');

type StaticLabels = {
  error: string;
  home: string;
};

export const getBreadcrumbItem = (
  response: unknown,
  pathname: string,
  labels: StaticLabels
): BreadcrumbsItem => {
  const homepageItem: BreadcrumbsItem = {
    id: 'homepage',
    label: labels.home,
    url: ROUTES.HOMEPAGE,
  };

  if (pathname === ROUTES.HOMEPAGE) return homepageItem;

  const errorItem: BreadcrumbsItem = {
    id: 'error-item',
    label: labels.error,
    url: ROUTES.NOT_FOUND,
  };

  if (!isAPIPayload(response)) return errorItem;

  if (isPagePayload(response) && response.data.page)
    return {
      id: response.data.page.id,
      label: response.data.page.meta?.title ?? response.data.page.name,
      url: response.data.page.slug,
    };

  return errorItem;
};

import type { DocEntryPayload, DocPayload, PagePayload } from '@cretadoc/api';
import type { BreadcrumbsItem } from '@cretadoc/ui';
import { isObjKeyExist, isObject } from '@cretadoc/utils';
import { getSlugInfoFrom } from '../../utils/client';
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

const isDocEntry = (
  response: APIPayload<Record<PropertyKey, unknown>>
): response is APIPayload<DocPayload<DocEntryPayload>> => {
  if (!isObjKeyExist(response.data, 'doc')) return false;
  if (!isObject(response.data.doc)) return false;
  return isObjKeyExist(response.data.doc, 'entry');
};

const isPage = (
  response: APIPayload<Record<PropertyKey, unknown>>
): response is APIPayload<PagePayload> =>
  isObjKeyExist(response.data, 'page') && isObject(response.data.page);

const getDocEntryItems = (
  entry: NonNullable<DocEntryPayload['entry']>
): BreadcrumbsItem[] => {
  const entryItem: BreadcrumbsItem = {
    id: entry.id,
    label: entry.meta?.title ?? entry.name,
    url: entry.slug,
  };

  if (!entry.parent) return [entryItem];

  const parentItem: BreadcrumbsItem = {
    id: entry.parent.id,
    label: entry.parent.meta?.title ?? entry.parent.name,
    url: entry.parent.slug,
  };

  return [parentItem, entryItem];
};

const getPageItem = (
  page: NonNullable<PagePayload['page']>
): BreadcrumbsItem => {
  return {
    id: page.id,
    label: page.meta?.title ?? page.name,
    url: page.slug,
  };
};

const getItemsFromNestedRoutes = (
  response: unknown,
  errorItem: BreadcrumbsItem
): BreadcrumbsItem[] => {
  if (!isAPIPayload(response)) return [errorItem];

  if (isDocEntry(response))
    return response.data.doc?.entry
      ? [...getDocEntryItems(response.data.doc.entry)]
      : [errorItem];

  if (isPage(response))
    return response.data.page ? [getPageItem(response.data.page)] : [errorItem];

  return [errorItem];
};

type StaticItems = {
  docItem: BreadcrumbsItem;
  errorItem: BreadcrumbsItem;
  homeItem: BreadcrumbsItem;
  getPageNumberItem: (page: number) => BreadcrumbsItem;
};

export const getBreadcrumbItem = (
  response: unknown,
  pathname: string,
  { docItem, errorItem, getPageNumberItem, homeItem }: StaticItems
): BreadcrumbsItem[] => {
  const items: BreadcrumbsItem[] = [];
  const { pageNumber, slug } = getSlugInfoFrom(pathname);

  if (pathname === docItem.url) items.push(docItem);
  else if (pathname === ROUTES.HOMEPAGE) items.push(homeItem);
  else if (pathname === ROUTES.NOT_FOUND) items.push(errorItem);
  else if (slug !== docItem.url)
    items.push(...getItemsFromNestedRoutes(response, errorItem));

  if (pageNumber) items.push(getPageNumberItem(pageNumber));

  return items;
};

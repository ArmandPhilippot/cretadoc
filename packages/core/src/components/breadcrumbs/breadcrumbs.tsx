import {
  Breadcrumbs as BaseBreadcrumbs,
  type BreadcrumbsItem,
  type BreadcrumbsProps as BaseBreadcrumbsProps,
} from '@cretadoc/ui';
import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useMatches } from 'react-router-dom';
import type { getBreadcrumbItem } from '../../routes/handlers';
import { ROUTES } from '../../utils/constants';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type RouteMatch = ArrayElement<ReturnType<typeof useMatches>>;

export type ValidRouteMatch = Omit<RouteMatch, 'handle'> & {
  handle: {
    getBreadcrumbItem: typeof getBreadcrumbItem;
  };
};

const isValidRouteMatch = (match: RouteMatch): match is ValidRouteMatch => {
  if (!isObject(match.handle)) return false;
  if (!isObjKeyExist(match.handle, 'getBreadcrumbItem')) return false;
  return true;
};

export type BreadcrumbsProps = Omit<
  BaseBreadcrumbsProps,
  'aria-label' | 'items'
>;

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const intl = useIntl();

  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Breadcrumbs',
    description: 'Breadcrumbs: aria label',
    id: 'Xid/53',
  });

  const homeItem: BreadcrumbsItem = {
    id: 'homepage',
    label: intl.formatMessage({
      defaultMessage: 'Home',
      description: 'Breadcrumbs: homepage label',
      id: 'y+utOz',
    }),
    url: ROUTES.HOMEPAGE,
  };
  const docItem: BreadcrumbsItem = {
    id: 'doc-page',
    label: intl.formatMessage({
      defaultMessage: 'Documentation',
      description: 'Breadcrumbs: documentation label',
      id: 'MLtCgG',
    }),
    url: ROUTES.DOC,
  };
  const errorItem: BreadcrumbsItem = {
    id: 'error-page',
    label: intl.formatMessage({
      defaultMessage: 'Error',
      description: 'Breadcrumbs: error label',
      id: 'zLpBew',
    }),
    url: ROUTES.NOT_FOUND,
  };

  const matches: RouteMatch[] = useMatches();
  const items = matches.filter(isValidRouteMatch).map((match) =>
    match.handle.getBreadcrumbItem(match.data, match.pathname, {
      docItem,
      errorItem,
      homeItem,
      getPageNumberItem: (page) => {
        return {
          id: `page-${page}`,
          label: intl.formatMessage(
            {
              defaultMessage: 'Page {page}',
              description: 'Breadcrumbs: page number label',
              id: 'l6eNYV',
            },
            {
              page,
            }
          ),
          url: match.pathname,
        };
      },
    })
  );

  return (
    <BaseBreadcrumbs {...props} aria-label={ariaLabel} items={items.flat()} />
  );
};

import {
  Breadcrumbs as BaseBreadcrumbs,
  type BreadcrumbsItem,
  type BreadcrumbsProps as BaseBreadcrumbsProps,
} from '@cretadoc/ui';
import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { type Params, useMatches } from 'react-router-dom';

export type RouteMatch = {
  id: string;
  pathname: string;
  params: Params;
  data: unknown;
  handle: unknown;
};

export type ValidRouteMatch = Omit<RouteMatch, 'handle'> & {
  handle: {
    getBreadcrumbItem: (data: unknown) => BreadcrumbsItem;
  };
};

export type BreadcrumbsProps = Omit<
  BaseBreadcrumbsProps,
  'aria-label' | 'items'
>;

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const intl = useIntl();

  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Breadcrumbs',
    id: 'Xid/53',
    description: 'Breadcrumbs: aria label',
  });

  const matches: RouteMatch[] = useMatches();
  const items = matches
    .filter((match): match is ValidRouteMatch => {
      if (!isObject(match.handle)) return false;
      if (!isObjKeyExist(match.handle, 'getBreadcrumbItem')) return false;
      return true;
    })
    .map((match) => match.handle.getBreadcrumbItem(match.data));

  return <BaseBreadcrumbs {...props} aria-label={ariaLabel} items={items} />;
};

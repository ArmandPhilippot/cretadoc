import {
  Breadcrumbs as BaseBreadcrumbs,
  type BreadcrumbsProps as BaseBreadcrumbsProps,
} from '@cretadoc/ui';
import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useMatches } from 'react-router-dom';
import type { getBreadcrumbItem } from '../../routes/handlers';

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
    id: 'Xid/53',
    description: 'Breadcrumbs: aria label',
  });

  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    id: 'y+utOz',
    description: 'Breadcrumbs: homepage label',
  });

  const errorLabel = intl.formatMessage({
    defaultMessage: 'Error',
    id: 'zLpBew',
    description: 'Breadcrumbs: error label',
  });

  const matches: RouteMatch[] = useMatches();
  const items = matches.filter(isValidRouteMatch).map((match) =>
    match.handle.getBreadcrumbItem(match.data, match.pathname, {
      error: errorLabel,
      home: homeLabel,
    })
  );

  return <BaseBreadcrumbs {...props} aria-label={ariaLabel} items={items} />;
};

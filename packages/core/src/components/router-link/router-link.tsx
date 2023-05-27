import type { LinkProps } from '@cretadoc/ui';
import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Link } from 'react-router-dom';

const RouterLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkProps
> = ({ ...props }, ref) => <Link {...props} ref={ref} />;

/**
 * A wrapper component around `react-router-dom` because of incompatibility
 * between the `to` attribute. React router allows `undefined`, `@cretadoc/ui`
 * does not.
 */
export const RouterLink = forwardRef(RouterLinkWithRef);

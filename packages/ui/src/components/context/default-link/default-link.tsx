import { type ForwardRefRenderFunction, forwardRef } from 'react';
import type { LinkProps } from '../../atoms';

const DefaultLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkProps
> = ({ children, to, ...props }, ref) => (
  <a {...props} href={to} ref={ref}>
    {children}
  </a>
);

/**
 * DefaultLink component.
 */
export const DefaultLink = forwardRef(DefaultLinkWithRef);

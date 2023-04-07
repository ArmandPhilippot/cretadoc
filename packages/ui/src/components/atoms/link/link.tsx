import {
  type AnchorHTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { UIContext, useComponentsFrom } from '../../context';
import * as styles from './link.css';

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  /**
   * The link target.
   */
  to: string;
};

const LinkWithRef: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  { children, className = '', hrefLang, to, ...props },
  ref
) => {
  const { LinkComponent } = useComponentsFrom(UIContext);
  const hasLang = !!hrefLang;
  const linkClassName = `${styles.link({ hasLang })} ${className}`;

  return (
    <LinkComponent
      {...props}
      className={linkClassName}
      hrefLang={hrefLang}
      ref={ref}
      to={to}
    >
      {children}
    </LinkComponent>
  );
};

/**
 * Link component.
 */
export const Link = forwardRef(LinkWithRef);

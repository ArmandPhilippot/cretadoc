import {
  type AnchorHTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
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
  const hasLang = !!hrefLang;
  const linkClassName = `${styles.link({ hasLang })} ${className}`;

  return (
    <a
      {...props}
      className={linkClassName}
      href={to}
      hrefLang={hrefLang}
      ref={ref}
    >
      {children}
    </a>
  );
};

/**
 * Link component.
 */
export const Link = forwardRef(LinkWithRef);

import type { AnchorHTMLAttributes, FC } from 'react';
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

/**
 * Link component.
 */
export const Link: FC<LinkProps> = ({
  children,
  className = '',
  hrefLang,
  to,
  ...props
}) => {
  const hasLang = !!hrefLang;
  const linkClassName = `${styles.link({ hasLang })} ${className}`;

  return (
    <a {...props} className={linkClassName} href={to} hrefLang={hrefLang}>
      {children}
    </a>
  );
};

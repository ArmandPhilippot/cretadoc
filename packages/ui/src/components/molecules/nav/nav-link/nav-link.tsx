import type { FC } from 'react';
import { Link, type LinkProps } from '../../../atoms';
import * as styles from './nav-link.css';

export type NavLinkVariant = 'block' | 'regular';

export type NavLinkProps = LinkProps & {
  /**
   * Should the link be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * It is the active navigation link?
   *
   * @default false
   */
  isSelected?: boolean;
  /**
   * Should the borders be smoother?
   *
   * It is commonly used with `block` variant.
   *
   * @default undefined
   */
  radiusOn?: 'left' | 'right' | 'both';
  /**
   * The link variant.
   *
   * @default 'regular'
   */
  variant?: NavLinkVariant;
};

export const NavLink: FC<NavLinkProps> = ({
  children,
  className = '',
  isDisabled = false,
  isSelected = false,
  radiusOn,
  variant = 'regular',
  to,
  ...props
}) => {
  const linkClassName = styles.link({
    isDisabled,
    isSelected,
    radiusOn,
    variant,
  });

  return isDisabled ? (
    <span className={`${linkClassName} ${className}`}>{children}</span>
  ) : (
    <Link {...props} className={`${linkClassName} ${className}`} to={to}>
      {children}
    </Link>
  );
};

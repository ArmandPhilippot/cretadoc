import type { FC } from 'react';
import { Link, type LinkProps } from '../../../atoms';
import * as styles from './nav-link.css';

export type NavLinkVariant = 'block' | 'regular';

export type NavLinkProps = Omit<LinkProps, 'to'> & {
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
   * The link target.
   */
  to?: string;
  /**
   * The link variant.
   *
   * @default 'regular'
   */
  variant?: NavLinkVariant;
};

/**
 * NavLink component.
 */
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

  return isDisabled || typeof to === 'undefined' ? (
    <span className={`${linkClassName} ${className}`}>{children}</span>
  ) : (
    <Link
      {...props}
      aria-current={isSelected}
      className={`${linkClassName} ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};

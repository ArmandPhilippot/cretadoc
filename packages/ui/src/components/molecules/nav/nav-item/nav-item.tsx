import type { ReactNode, FC } from 'react';
import { ListItem, type ListItemProps } from '../../../atoms';
import { NavLink, type NavLinkProps } from '../nav-link';
import * as styles from './nav-item.css';

export type NavItemProps = Omit<ListItemProps, 'children' | 'isBordered'> &
  Pick<
    NavLinkProps,
    'isDisabled' | 'isSelected' | 'radiusOn' | 'to' | 'variant'
  > & {
    /**
     * The nav item label.
     */
    label: ReactNode;
    /**
     * Add a separator after the nav link.
     */
    sep?: string;
  };

/**
 * NavItem component.
 */
export const NavItem: FC<NavItemProps> = ({
  className = '',
  isDisabled = false,
  isSelected = false,
  label,
  radiusOn,
  sep,
  to,
  variant,
  ...props
}) => (
  <ListItem
    {...props}
    className={`${styles.item} ${className}`}
    hasMarker={false}
  >
    <NavLink
      isDisabled={isDisabled}
      isSelected={isSelected}
      radiusOn={radiusOn}
      to={to}
      variant={variant}
    >
      {label}
    </NavLink>
    {sep ? <span aria-hidden={true}>{sep}</span> : null}
  </ListItem>
);

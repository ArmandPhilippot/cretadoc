import type { ReactNode, FC } from 'react';
import { ListItem, type ListItemProps } from '../../../atoms';
import { NavLink, type NavLinkProps } from '../nav-link';
import * as styles from './nav-item.css';

export type NavItemProps = Omit<ListItemProps, 'children'> &
  Pick<
    NavLinkProps,
    'isDisabled' | 'isSelected' | 'radiusOn' | 'to' | 'variant'
  > & {
    /**
     * The nav item label.
     */
    label: ReactNode;
    /**
     * Provide an accessible name to the link.
     */
    linkAriaLabel?: string;
    /**
     * Add a separator after the nav link.
     */
    sep?: string;
  };

/**
 * NavItem component.
 */
export const NavItem: FC<NavItemProps> = ({
  'aria-label': ariaLabel,
  className = '',
  isDisabled = false,
  isSelected = false,
  label,
  linkAriaLabel,
  radiusOn,
  sep,
  to,
  variant,
  ...props
}) => {
  const itemAriaLabel = isDisabled ? ariaLabel ?? linkAriaLabel : ariaLabel;

  return (
    <ListItem
      {...props}
      aria-label={itemAriaLabel}
      className={`${styles.item} ${className}`}
      hasMarker={false}
    >
      <NavLink
        aria-label={linkAriaLabel}
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
};

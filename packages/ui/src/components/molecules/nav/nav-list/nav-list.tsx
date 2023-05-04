import type { ReactElement } from 'react';
import { List, type ListProps } from '../../../atoms';
import type { NavItemProps } from '../nav-item';
import * as styles from './nav-list.css';

export type NavListProps<T extends boolean> = Omit<
  ListProps<T>,
  'children' | 'hasMarker'
> & {
  children: ReactElement<NavItemProps> | Array<ReactElement<NavItemProps>>;
};

/**
 * NavList component.
 */
export const NavList = <T extends boolean>({
  children,
  className = '',
  ...props
}: NavListProps<T>) => (
  <List {...props} className={`${styles.list} ${className}`} hasMarker={false}>
    {children}
  </List>
);

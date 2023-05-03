import type { ReactElement } from 'react';
import { List, type ListProps } from '../../../atoms';
import type { NavItemProps } from '../nav-item';

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
  ...props
}: NavListProps<T>) => (
  <List hasMarker={false} {...props}>
    {children}
  </List>
);

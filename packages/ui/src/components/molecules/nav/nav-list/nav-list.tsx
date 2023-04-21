import type { HTMLAttributes, ReactElement } from 'react';
import { List, type ListProps } from '../../../atoms';
import type { NavItemProps } from '../nav-item';

export type NavListProps<T extends boolean> = Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> &
  Pick<ListProps<T>, 'isInline' | 'isOrdered' | 'spacing'> & {
    children: ReactElement<NavItemProps> | Array<ReactElement<NavItemProps>>;
  };

/**
 * NavList component.
 */
export const NavList = <T extends boolean>({
  children,
  isInline,
  isOrdered,
  spacing,
  ...props
}: NavListProps<T>) => (
  <nav {...props}>
    <List
      hasMarker={false}
      isInline={isInline}
      isOrdered={isOrdered}
      spacing={spacing}
    >
      {children}
    </List>
  </nav>
);

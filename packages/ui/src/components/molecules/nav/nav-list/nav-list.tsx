import type { ReactElement } from 'react';
import type { Position } from '../../../../types';
import { List, type ListProps } from '../../../atoms';
import type { NavItemProps } from '../nav-item';
import * as styles from './nav-list.css';

export type NavListProps<T extends boolean> = Omit<
  ListProps<T>,
  'children' | 'hasMarker'
> & {
  /**
   * Define the nav list alignment when using inlined list.
   *
   * @default "left"
   */
  alignment?: Exclude<Position, 'bottom' | 'top'>;
  /**
   * The nav items.
   */
  children: ReactElement<NavItemProps> | Array<ReactElement<NavItemProps>>;
};

/**
 * NavList component.
 */
export const NavList = <T extends boolean>({
  alignment = 'left',
  children,
  className = '',
  ...props
}: NavListProps<T>) => {
  const listClassName = styles.list({ alignment });

  return (
    <List
      {...props}
      className={`${listClassName} ${className}`}
      hasMarker={false}
    >
      {children}
    </List>
  );
};

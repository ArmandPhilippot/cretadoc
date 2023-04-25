import type { FC } from 'react';
import { NavItem, type NavItemProps } from '../../../../molecules';

export type PageNumberProps = Omit<
  NavItemProps,
  'isDisabled' | 'isSelected' | 'label'
> & {
  /**
   * Define if it is the current page.
   *
   * @default false
   */
  isCurrentPage?: boolean;
  /**
   * The page number.
   */
  number: number;
};

/**
 * PageNumber component.
 */
export const PageNumber: FC<PageNumberProps> = ({
  isCurrentPage = false,
  number,
  ...props
}) => (
  <NavItem
    {...props}
    isDisabled={isCurrentPage}
    isSelected={isCurrentPage}
    label={number}
  />
);

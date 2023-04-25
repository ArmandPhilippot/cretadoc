import type { FC } from 'react';
import { NavItem, type NavItemProps } from '../../../../molecules';

export type EllipsisProps = Omit<
  NavItemProps,
  'isDisabled' | 'isSelected' | 'label' | 'to'
>;

/**
 * Ellipsis component.
 */
export const Ellipsis: FC<EllipsisProps> = (props) => {
  const ellipsis = '\u2026' as const;

  return <NavItem {...props} isDisabled label={ellipsis} to="" />;
};

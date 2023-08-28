import type { FC, MouseEventHandler } from 'react';
import { Button } from '../../../../atoms';
import { NavItem, type NavItemProps } from '../../../../molecules';
import * as styles from './ellipsis-item.css';

type EllipsisItemProps = Omit<NavItemProps, 'label'> & {
  label: string;
  onExpand: MouseEventHandler<HTMLButtonElement>;
};

export const EllipsisItem: FC<EllipsisItemProps> = ({
  className = '',
  label,
  onExpand,
  ...props
}) => {
  const itemClassName = `${styles.ellipsis} ${className}`;

  return (
    <NavItem
      {...props}
      label={
        <Button
          aria-label={label}
          className={itemClassName}
          kind="neutral"
          onClick={onExpand}
        >
          …
        </Button>
      }
    />
  );
};

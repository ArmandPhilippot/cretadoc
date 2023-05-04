import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import type { LengthPercentage } from '../../../themes/types/css';
import { Button, Icon } from '../../atoms';
import * as styles from './drawer.css';

export type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The drawer body.
   */
  children: ReactNode;
  /**
   * Add an accessible name for the close button.
   */
  closeBtnLabel?: string;
  /**
   * Should we add a close button to the bottom of the drawer?
   *
   * @default false
   */
  hasCloseBtn?: boolean;
  /**
   * Is the drawer opened?
   *
   * @default true
   */
  isOpen?: boolean;
  /**
   * The drawer max width.
   */
  maxWidth?: LengthPercentage;
  /**
   * A function to trigger when user clicks on close button.
   */
  onClose?: () => void;
};

/**
 * Drawer component.
 */
export const Drawer: FC<DrawerProps> = ({
  children,
  className = '',
  closeBtnLabel,
  hasCloseBtn = false,
  isOpen = true,
  maxWidth,
  onClose,
  style,
  ...props
}) => {
  const drawerClassName = styles.drawer({
    isOpen,
  });
  const drawerStyles = assignInlineVars({
    [styles.drawerWidth]: maxWidth ?? '',
  });

  return (
    <div
      {...props}
      className={`${drawerClassName} ${className}`}
      style={{ ...drawerStyles, ...style }}
    >
      <div className={styles.content}>{children}</div>
      {hasCloseBtn ? (
        <Button
          aria-label={closeBtnLabel}
          className={styles.btn}
          kind="neutral"
          onClick={onClose}
        >
          <Icon color="primary" shape="cross" />
        </Button>
      ) : null}
    </div>
  );
};

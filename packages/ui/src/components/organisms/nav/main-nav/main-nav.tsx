import {
  type FC,
  type MouseEvent as ReactMouseEvent,
  useCallback,
} from 'react';
import { useScrollLock } from '../../../../hooks';
import { Button, Icon, Nav, type NavProps, Overlay } from '../../../atoms';
import { Drawer, type DrawerProps } from '../../../molecules/drawer';
import * as styles from './main-nav.css';

export type MainNavProps = NavProps &
  Pick<
    DrawerProps,
    'closeBtnLabel' | 'hasCloseBtn' | 'maxWidth' | 'onClose'
  > & {
    /**
     * Define an id for the drawer. It will be used to improve accessibility.
     */
    drawerId?: string;
    /**
     * Is the main nav opened?
     *
     * @default false
     */
    isOpen?: boolean;
    /**
     * Handle click on overlay.
     */
    onClickOutside?: () => void;
    /**
     * Handle click on hamburger button.
     */
    onToggle?: () => void;
    /**
     * Add an accessible name to the hamburger button.
     */
    toggleBtnLabel?: string;
  };

/**
 * MainNav component.
 */
export const MainNav: FC<MainNavProps> = ({
  children,
  className = '',
  closeBtnLabel,
  drawerId,
  hasCloseBtn = false,
  isOpen = false,
  maxWidth,
  onClickOutside,
  onClose,
  onToggle,
  toggleBtnLabel,
  ...props
}) => {
  const stopPropagation = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation();
  }, []);

  useScrollLock(isOpen);

  return (
    <Nav {...props}>
      <Button
        aria-controls={drawerId}
        aria-expanded={isOpen}
        aria-label={toggleBtnLabel}
        kind="neutral"
        onClick={onToggle}
      >
        <Icon color="primary" shape="hamburger" />
      </Button>
      <Overlay isVisible={isOpen} onClick={onClickOutside}>
        <Drawer
          className={`${styles.panel} ${className}`}
          closeBtnLabel={closeBtnLabel}
          hasCloseBtn={hasCloseBtn}
          id={drawerId}
          isOpen={isOpen}
          maxWidth={maxWidth}
          onClick={stopPropagation}
          onClose={onClose}
        >
          {children}
        </Drawer>
      </Overlay>
    </Nav>
  );
};

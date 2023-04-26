import type { FC, HTMLAttributes, ReactNode } from 'react';
import * as styles from './overlay.css';

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Overlay component.
 */
export const Overlay: FC<OverlayProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div {...props} className={`${styles.overlay} ${className}`}>
    {children}
  </div>
);

import type { FC, HTMLAttributes, ReactNode } from 'react';
import * as styles from './overlay.css';

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The elements to display in front of the overlay.
   */
  children: ReactNode;
  /**
   * Should the overlay be visible?
   *
   * Use it if you want an animated overlay instead of mounting/demounting it.
   *
   * @default true
   */
  isVisible?: boolean;
};

/**
 * Overlay component.
 */
export const Overlay: FC<OverlayProps> = ({
  children,
  className = '',
  isVisible = true,
  ...props
}) => {
  const overlayClassName = styles.overlay({ isVisible });

  return (
    <div {...props} className={`${overlayClassName} ${className}`}>
      {children}
    </div>
  );
};

import type { FC, HTMLAttributes } from 'react';
import * as styles from './demo.css';

export type DemoPanelProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Add a text at the beginning to explain the panel purpose.
   */
  heading?: string;
};

/**
 * DemoPanel component.
 *
 * Use it inside a `Demo` component. Commonly used to print `Input`/`Output`.
 */
export const DemoPanel: FC<DemoPanelProps> = ({
  children,
  className = '',
  heading,
  ...props
}) => (
  <div {...props} className={`${styles.panel} ${className}`}>
    <p className={styles.heading}>{heading}</p>
    {children}
  </div>
);

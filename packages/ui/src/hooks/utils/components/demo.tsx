import type { FC, HTMLAttributes } from 'react';
import * as styles from './demo.css';

export type DemoProps = HTMLAttributes<HTMLDivElement>;

/**
 * Demo component.
 *
 * Use it as wrapper for hooks demo.
 */
export const Demo: FC<DemoProps> = ({ className = '', ...props }) => (
  <div {...props} className={`${styles.wrapper} ${className}`} />
);

import type { FC, HTMLAttributes, ReactNode } from 'react';
import * as styles from './layout.css';

export type LayoutProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode | ReactNode[];
};

/**
 * Layout component.
 */
export const Layout: FC<LayoutProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div {...props} className={`${styles.layout} ${className}`}>
    {children}
  </div>
);

import type { FC, HTMLAttributes, ReactNode } from 'react';
import * as styles from './preview-list.css';

export type PreviewListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children: ReactNode;
  hasSpaceBetween?: boolean;
  isStacked?: boolean;
};

export const PreviewList: FC<PreviewListProps> = ({
  children,
  className = '',
  hasSpaceBetween = false,
  isStacked = false,
  ...props
}) => {
  const wrapperClassName = `${styles.wrapper({
    hasSpaceBetween,
    isStacked,
  })} ${className}`;

  return (
    <div {...props} className={wrapperClassName}>
      {children}
    </div>
  );
};

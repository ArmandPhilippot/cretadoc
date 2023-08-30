import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import type { Length } from '../../../../types/css';
import * as styles from './truncate.css';

export type TruncateProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'title'
> & {
  /**
   * The text.
   */
  children: string;
  /**
   * The text max width.
   */
  max: Length;
};

/**
 * Truncate component.
 */
export const Truncate: FC<TruncateProps> = ({
  children,
  className = '',
  max,
  style,
  ...props
}) => {
  const classNames = `${styles.txt} ${className}`;
  const dynamicStyles = assignInlineVars({
    [styles.maxWidth]: max,
  });
  const allStyles = { ...dynamicStyles, ...style };

  return (
    <span {...props} className={classNames} style={allStyles} title={children}>
      {children}
    </span>
  );
};

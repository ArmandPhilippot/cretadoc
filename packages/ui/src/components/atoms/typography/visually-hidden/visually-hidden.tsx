import type { FC, HTMLAttributes } from 'react';
import * as styles from './visually-hidden.css';

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  /**
   * Determine if the hidden content should be focusable or not.
   *
   * @default false
   */
  isFocusable?: boolean;
};

/**
 * VisuallyHidden component.
 */
export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  children,
  className = '',
  isFocusable = false,
  ...props
}) => {
  const wrapperClassName = styles.visuallyHidden({ isFocusable });

  return (
    <span {...props} className={`${wrapperClassName} ${className}`}>
      {children}
    </span>
  );
};

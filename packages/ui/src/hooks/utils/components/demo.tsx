import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import type { LengthPercentage } from '../../../themes/types/css';
import * as styles from './demo.css';

export type DemoProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Should we use a grid layout or a flex one?
   *
   * @default false
   */
  isGrid?: boolean;
  /**
   * Define a custom panel width.
   */
  panelWidth?: LengthPercentage;
};

/**
 * Demo component.
 *
 * Use it as wrapper for hooks demo.
 */
export const Demo: FC<DemoProps> = ({
  className = '',
  isGrid = false,
  panelWidth,
  style,
  ...props
}) => {
  const wrapperClassName = styles.wrapper({ isGrid });
  const wrapperStyles = panelWidth
    ? assignInlineVars({
        [styles.panelWidth]: panelWidth,
      })
    : {};

  return (
    <div
      {...props}
      className={`${wrapperClassName} ${className}`}
      style={{ ...wrapperStyles, ...style }}
    />
  );
};

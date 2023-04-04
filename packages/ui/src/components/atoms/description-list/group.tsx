import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import { contract } from '../../../themes';
import type { SpacingTokens } from '../../../themes/types/tokens';
import * as styles from './description-list.css';

export type GroupProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Should the items in the group be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * Set the spacing between the group items.
   *
   * @default undefined
   */
  spacing?: keyof SpacingTokens;
};

/**
 * Group component.
 *
 * Must be used inside a `GroupList` component.
 */
export const Group: FC<GroupProps> = ({
  children,
  className = '',
  isInline = false,
  spacing,
  style,
  ...props
}) => {
  const groupClassName = styles.group({ isInline });
  const groupStyles = spacing
    ? assignInlineVars({ [styles.groupSpacing]: contract.spacing[spacing] })
    : {};

  return (
    <div
      {...props}
      className={`${groupClassName} ${className}`}
      style={{ ...groupStyles, ...style }}
    >
      {children}
    </div>
  );
};

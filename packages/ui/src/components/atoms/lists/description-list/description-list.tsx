import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import { contract } from '../../../../themes';
import type { SpacingTokens } from '../../../../themes/types/tokens';
import * as styles from './description-list.css';

export type DescriptionListProps = HTMLAttributes<HTMLDListElement> & {
  /**
   * Should the items in the group be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * Set the spacing between list groups (implicit or not).
   *
   * @default undefined
   */
  spacing?: keyof SpacingTokens;
};

/**
 * DescriptionList component.
 */
export const DescriptionList: FC<DescriptionListProps> = ({
  children,
  className = '',
  isInline = false,
  spacing,
  style,
  ...props
}) => {
  const listClassName = styles.list({ isInline });
  const listStyles = spacing
    ? assignInlineVars({ [styles.listSpacing]: contract.spacing[spacing] })
    : {};

  return (
    <dl
      {...props}
      className={`${listClassName} ${className}`}
      style={{ ...listStyles, ...style }}
    >
      {children}
    </dl>
  );
};

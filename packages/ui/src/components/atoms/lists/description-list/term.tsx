import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import type { ColorContextTokens } from '../../../../themes/types/tokens';
import { getColorFromTokenKey } from '../../../utils/helpers';
import * as styles from './description-list.css';

export type TermProps = HTMLAttributes<HTMLElement> & {
  /**
   * Set the term color.
   *
   * @default 'regular'
   */
  color?: keyof ColorContextTokens;
};

/**
 * Term component.
 *
 * Must be used inside a `DescriptionList` component.
 */
export const Term: FC<TermProps> = ({
  children,
  className = '',
  color = 'regular',
  style,
  ...props
}) => {
  const termClassName = styles.term;
  const termStyles = assignInlineVars({
    [styles.termColor]: getColorFromTokenKey(color),
  });

  return (
    <dt
      {...props}
      className={`${termClassName} ${className}`}
      style={{ ...termStyles, ...style }}
    >
      {children}
    </dt>
  );
};

import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { contract } from '../../../../../themes';
import type { ColorContextTokens } from '../../../../../types';
import { getColorFromContract } from '../../../../../utils/helpers';
import * as styles from '../description-list.css';

export type TermProps = HTMLAttributes<HTMLElement> & {
  /**
   * A term.
   */
  children: ReactNode;
  /**
   * Set the term color.
   *
   * @default 'regular'
   */
  color?: keyof ColorContextTokens;
  /**
   * Should the term use a bold font-weight?
   *
   * @default true
   */
  isBold?: boolean;
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
  isBold = true,
  style,
  ...props
}) => {
  const termClassName = styles.term({ isBold });
  const termStyles = assignInlineVars({
    [styles.termColor]: getColorFromContract(contract, color, 'foreground'),
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

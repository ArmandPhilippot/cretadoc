import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import { contract } from '../../../themes';
import type { IconSizeTokens } from '../../../themes/types/tokens';
import type { Position } from '../../types';
import * as styles from './spinner.css';

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The spinner position when using children.
   *
   * @default 'top'
   */
  position?: Exclude<Position, 'center'>;
  /**
   * Set the spinner size.
   *
   * @default 'sm'
   */
  size?: keyof IconSizeTokens;
};

/**
 * Spinner component.
 */
export const Spinner: FC<SpinnerProps> = ({
  children,
  className = '',
  position = 'top',
  size = 'sm',
  ...props
}) => {
  const wrapperClassName = `${styles.wrapper({ position, size })} ${className}`;
  const spinnerStyles = assignInlineVars({
    [styles.size]: contract.icon.size[size],
  });

  return (
    <div {...props} className={wrapperClassName}>
      <div className={styles.spinner} style={spinnerStyles} />
      {children}
    </div>
  );
};

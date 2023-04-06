import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import { contract } from '../../../../themes';
import type {
  ColorContextTokens,
  FontSizeTokens,
} from '../../../../themes/types/tokens';
import { getColorFromTokenKey } from '../../../utils/helpers';
import * as styles from './legend.css';

export type LegendColor = keyof ColorContextTokens | 'primary';

export type LegendSize = Exclude<keyof FontSizeTokens, 'xl' | 'xxl'>;

export type LegendProps = HTMLAttributes<HTMLLegendElement> & {
  /**
   * Set the legend color.
   *
   * @default 'foreground'
   */
  color?: LegendColor;
  /**
   * Set the legend size.
   *
   * @default 'md'
   */
  size?: LegendSize;
};

/**
 * Legend component.
 */
export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  color = 'regular',
  size = 'md',
  style,
  ...props
}) => {
  const legendClassName = styles.legend;
  const legendStyles = assignInlineVars({
    [styles.legendColor]: getColorFromTokenKey(color),
    [styles.legendSize]: contract.font.size[size],
  });

  return (
    <legend
      {...props}
      className={`${legendClassName} ${className}`}
      style={{ ...legendStyles, ...style }}
    >
      {children}
    </legend>
  );
};

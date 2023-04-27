import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, LabelHTMLAttributes, ReactNode } from 'react';
import { contract } from '../../../../themes';
import type {
  ColorContextTokens,
  FontSizeTokens,
} from '../../../../themes/types/tokens';
import { getColorFromTokenKey } from '../../../utils/helpers';
import * as styles from './label.css';

export type LabelColor = keyof ColorContextTokens | 'primary';

export type LabelSize = Exclude<keyof FontSizeTokens, 'xl' | 'xxl'>;

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * Set the label color.
   *
   * Use either the same color as the text or the theme primary color.
   *
   * @default 'foreground'
   */
  color?: LabelColor;
  /**
   * Is the associated field required?
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * The symbol to display when the field is required.
   *
   * @default ' *'
   */
  requiredSymbol?: ReactNode;
  /**
   * Set the label size.
   *
   * @default 'md'
   */
  size?: LabelSize;
};

/**
 * Label component.
 */
export const Label: FC<LabelProps> = ({
  children,
  className = '',
  color = 'regular',
  isRequired = false,
  requiredSymbol = ' *',
  size = 'md',
  style,
  ...props
}) => {
  const labelStyles = assignInlineVars({
    [styles.labelColor]: getColorFromTokenKey(color, 'foreground'),
    [styles.labelSize]: contract.font.size[size],
  });

  return (
    <label
      {...props}
      className={`${styles.label} ${className}`}
      style={{ ...labelStyles, ...style }}
    >
      {children}
      {isRequired ? (
        <span aria-hidden className={styles.required}>
          {requiredSymbol}
        </span>
      ) : null}
    </label>
  );
};

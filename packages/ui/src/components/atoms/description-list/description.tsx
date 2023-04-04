import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import type { ColorContextTokens } from '../../../themes/types/tokens';
import { getColorFromTokenKey } from '../../utils/helpers';
import * as styles from './description-list.css';

export type DescriptionProps = HTMLAttributes<HTMLElement> & {
  /**
   * Set the description color.
   *
   * @default 'regular'
   */
  color?: keyof ColorContextTokens;
};

/**
 * Description component.
 *
 * Must be used inside a `DescriptionList` component.
 */
export const Description: FC<DescriptionProps> = ({
  children,
  className = '',
  color = 'regular',
  style,
  ...props
}) => {
  const descriptionClassName = styles.description;
  const descriptionStyles = assignInlineVars({
    [styles.descriptionColor]: getColorFromTokenKey(color),
  });

  return (
    <dd
      {...props}
      className={`${descriptionClassName} ${className}`}
      style={{ ...descriptionStyles, ...style }}
    >
      {children}
    </dd>
  );
};

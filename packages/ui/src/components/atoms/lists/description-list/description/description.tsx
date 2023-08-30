import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { contract } from '../../../../../themes';
import type { ColorContextTokens } from '../../../../../types';
import { getColorFromContract } from '../../../../../utils/helpers';
import * as styles from '../description-list.css';

export type DescriptionProps = HTMLAttributes<HTMLElement> & {
  /**
   * The description.
   */
  children: ReactNode;
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
    [styles.descriptionColor]: getColorFromContract(
      contract,
      color,
      'foreground'
    ),
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

import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, LiHTMLAttributes } from 'react';
import { contract } from '../../../../../themes';
import type {
  BorderSizeTokens,
  ColorContextTokens,
  Position,
  SpacingTokens,
} from '../../../../../types';
import { getColorFromContract } from '../../../../../utils/helpers';
import * as styles from './list-item.css';

export type ListItemBorderPosition =
  | Exclude<Position, 'center'>
  | 'block'
  | 'inline';

export type ListItemBorderColor = keyof ColorContextTokens | 'primary';

export type ListItemBorderSize = keyof BorderSizeTokens;

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /**
   * Define the desired borders when `isBordered` is active. If `undefined` all
   * the borders are visible.
   *
   * @default undefined
   */
  border?: ListItemBorderPosition;
  /**
   * Define the border color.
   *
   * @default 'regular'
   */
  borderColor?: ListItemBorderColor;
  /**
   * Define the border size.
   *
   * @default 'sm'
   */
  borderSize?: ListItemBorderSize;
  /**
   * Should the list item have a marker?
   *
   * @default true
   */
  hasMarker?: boolean;
  /**
   * Should we add borders around the item?
   *
   * @default false
   */
  isBordered?: boolean;
  /**
   * Define the marker to use when `hasMarker` is set. You can also use a
   * keyword predefined by `list-style-type`.
   */
  marker?: string;
  /**
   * Add a padding block to the list item. Only used with `isBordered` set.
   *
   * @default 'xxs'
   */
  paddingBlock?: keyof SpacingTokens;
  /**
   * Add a padding inline to the list item. Only used with `isBordered` set.
   *
   * @default 'xs'
   */
  paddingInline?: keyof SpacingTokens;
};

/**
 * Retrieve the borders styles from user input.
 *
 * @param {Pick<ListItemProps, 'border' | 'isBordered'>} config - User input.
 * @returns {styles.ListItemVariants['border']} The border variant.
 */
const getBordersStyles = ({
  border,
  isBordered,
}: Pick<
  ListItemProps,
  'border' | 'isBordered'
>): styles.ListItemVariants['border'] => {
  if (!isBordered) return undefined;
  if (!border) return 'all';
  return border;
};

/**
 * ListItem component.
 */
export const ListItem: FC<ListItemProps> = ({
  border,
  borderColor = 'regular',
  borderSize = 'sm',
  children,
  className = '',
  hasMarker = true,
  isBordered = false,
  marker,
  paddingBlock,
  paddingInline,
  style,
  ...props
}) => {
  const itemClassName = styles.item({
    border: getBordersStyles({ border, isBordered }),
    hasMarker,
    isBordered,
  });
  const itemStyles = assignInlineVars({
    [styles.borderColor]: getColorFromContract(
      contract,
      borderColor,
      'borders'
    ),
    [styles.borderSize]: contract.border.size[borderSize],
    ...(marker ? { [styles.marker]: marker } : {}),
    ...(paddingBlock
      ? { [styles.paddingBlock]: contract.spacing[paddingBlock] }
      : {}),
    ...(paddingInline
      ? { [styles.paddingInline]: contract.spacing[paddingInline] }
      : {}),
  });

  return (
    <li
      {...props}
      className={`${itemClassName} ${className}`}
      style={{ ...itemStyles, ...style }}
    >
      {children}
    </li>
  );
};

import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  createElement,
  type ReactElement,
  type HTMLAttributes,
  type ReactHTML,
  type OlHTMLAttributes,
  Children,
  cloneElement,
} from 'react';
import { contract } from '../../../themes';
import type { SpacingTokens } from '../../../themes/types/tokens';
import type {
  ListItemBorderColor,
  ListItemBorderPosition,
  ListItemBorderSize,
  ListItemProps,
} from '../list-item';
import * as styles from './list.css';

export type UnorderedListProps = HTMLAttributes<HTMLUListElement>;
export type OrderedListProps = OlHTMLAttributes<HTMLOListElement>;

type ResolveListProps<T extends boolean> = T extends true
  ? OrderedListProps
  : UnorderedListProps;

export type ListProps<T extends boolean> = ResolveListProps<T> & {
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
   * The list content.
   */
  children: Array<ReactElement<ListItemProps>>;
  /**
   * Should the list items have a marker?
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
   * Should the list items be displayed inline?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * Define the list kind: either ordered or unordered.
   *
   * @default false
   */
  isOrdered?: T;
  /**
   * Define the marker to use when `hasMarker` is set. You can also use a
   * keyword predefined by `list-style-type`.
   */
  marker?: string;
  /**
   * Define the size of the spacing between the list items.
   *
   * @default undefined
   */
  spacing?: keyof SpacingTokens;
};

/**
 * List component.
 */
export const List = <T extends boolean>({
  border,
  borderColor,
  borderSize,
  children,
  className = '',
  hasMarker = true,
  isBordered = false,
  isInline = false,
  isOrdered,
  marker,
  spacing,
  style,
  ...props
}: ListProps<T>) => {
  const listTag = isOrdered ? 'ol' : 'ul';
  const listClassName = styles.list({ hasMarker, isBordered, isInline });
  const listStyles = spacing
    ? assignInlineVars({
        [styles.itemSpacing]: contract.spacing[spacing],
      })
    : {};
  const itemClassName = styles.item({});

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(
      child,
      {
        ...child.props,
        border: child.props.border ?? border,
        borderColor: child.props.borderColor ?? borderColor,
        borderSize: child.props.borderSize ?? borderSize,
        className: `${itemClassName} ${child.props.className ?? ''}`,
        hasMarker: child.props.hasMarker ?? hasMarker,
        isBordered: child.props.isBordered ?? isBordered,
        isInline,
        marker: child.props.marker ?? marker,
      },
      child.props.children
    )
  );

  return createElement(
    listTag as keyof ReactHTML,
    {
      ...props,
      className: `${listClassName} ${className}`,
      style: { ...listStyles, ...style },
    },
    childrenWithProps
  );
};

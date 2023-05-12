import type { Nullable } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { HTMLAttributes, OlHTMLAttributes, FC } from 'react';
import { contract } from '../../../../themes';
import type { SpacingTokens } from '../../../../themes/types/tokens';
import * as styles from './list.css';

export type UnorderedListProps = HTMLAttributes<HTMLUListElement>;
export type OrderedListProps = OlHTMLAttributes<HTMLOListElement>;

type ResolveListProps<T extends boolean> = T extends true
  ? OrderedListProps
  : UnorderedListProps;

export type ListProps<T extends boolean> = ResolveListProps<T> & {
  /**
   * Should the list items have a marker?
   *
   * @default true
   */
  hasMarker?: boolean;
  /**
   * Should the numbering keep track of hierarchy when using ordered list?
   *
   * @default false
   */
  isHierarchical?: T extends true ? boolean : undefined;
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
   * Define the size of the spacing between the list items.
   *
   * @default 'xxs'
   */
  spacing?: Nullable<keyof SpacingTokens>;
};

const OrderedList: FC<OrderedListProps> = (props) => <ol {...props} />;
const UnorderedList: FC<UnorderedListProps> = (props) => <ul {...props} />;

/**
 * List component.
 */
export const List = <T extends boolean>({
  children,
  className = '',
  hasMarker = true,
  isHierarchical = false,
  isInline = false,
  isOrdered,
  spacing = 'xxs',
  style,
  ...props
}: ListProps<T>) => {
  const ListComponent = isOrdered ? OrderedList : UnorderedList;
  const listClassName = styles.list({ hasMarker, isHierarchical, isInline });
  const listStyles = assignInlineVars({
    [styles.itemSpacing]: spacing ? contract.spacing[spacing] : '0',
  });

  return (
    <ListComponent
      {...props}
      className={`${listClassName} ${className}`}
      style={{ ...listStyles, ...style }}
    >
      {children}
    </ListComponent>
  );
};

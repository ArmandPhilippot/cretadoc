import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { ReactElement } from 'react';
import type { LengthPercentage } from '../../../themes/types/css';
import { List, ListItem, type ListProps } from '../../atoms';
import type { CardProps } from '../../molecules';
import * as styles from './cards-list.css';

export type CardItem = {
  id: string;
  card: ReactElement<CardProps>;
};

export type CardsListProps<T extends boolean> = Omit<
  ListProps<T>,
  | 'border'
  | 'borderColor'
  | 'borderSize'
  | 'children'
  | 'hasMarker'
  | 'isBordered'
  | 'isInline'
  | 'marker'
  | 'spacing'
> & {
  /**
   * The cards.
   */
  items: CardItem[];
  /**
   * Define the max width of a card.
   *
   * @default '35ch'
   */
  maxCardWidth?: LengthPercentage;
};

/**
 * CardsList component.
 */
export const CardsList = <T extends boolean>({
  className = '',
  items,
  maxCardWidth = '35ch',
  style,
  ...props
}: CardsListProps<T>) => {
  const listClassName = styles.list;
  const listStyles = assignInlineVars({
    [styles.maxCardWidth]: maxCardWidth,
  });

  return (
    <List
      {...props}
      className={`${listClassName} ${className}`}
      hasMarker={false}
      isInline
      style={{ ...listStyles, ...style }}
    >
      {items.map((item) => (
        <ListItem key={item.id}>{item.card}</ListItem>
      ))}
    </List>
  );
};

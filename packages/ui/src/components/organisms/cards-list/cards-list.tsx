import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Children, type ReactElement } from 'react';
import type { LengthPercentage } from '../../../themes/types/css';
import { List, ListItem, type ListProps } from '../../atoms';
import type { CardProps } from '../../molecules';
import * as styles from './cards-list.css';

export type CardsListProps<T extends boolean> = Omit<
  ListProps<T>,
  | 'border'
  | 'borderColor'
  | 'borderSize'
  | 'hasMarker'
  | 'isBordered'
  | 'isInline'
  | 'marker'
  | 'spacing'
> & {
  children: ReactElement<CardProps> | Array<ReactElement<CardProps>>;
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
  children,
  className = '',
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
      style={{ ...listStyles, ...style }}
    >
      {Children.map(children, (child) => (
        <ListItem>{child}</ListItem>
      ))}
    </List>
  );
};

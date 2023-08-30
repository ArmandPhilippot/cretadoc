import type { FC, ReactNode } from 'react';
import type { Position } from '../../../types';
import { Link, List, ListItem, type ListProps } from '../../atoms';
import * as styles from './colophon.css';

export type ColophonProps = Omit<
  ListProps<false>,
  | 'children'
  | 'hasMarker'
  | 'isBordered'
  | 'isInline'
  | 'isOrdered'
  | 'marker'
  | 'spacing'
> & {
  alignment?: Extract<Position, 'center' | 'left' | 'right'>;
  /**
   * Set the copyright notice.
   */
  copyright?: ReactNode;
  /**
   * Display the website generator.
   */
  generator?: ReactNode;
  /**
   * Add a legal notice link.
   */
  legalNotice?: {
    label: string;
    link: string;
  };
};

/**
 * Colophon component.
 */
export const Colophon: FC<ColophonProps> = ({
  alignment = 'left',
  className = '',
  copyright,
  generator,
  legalNotice,
  ...props
}) => {
  const colophonClassName = styles.colophon({ alignment });

  return (
    <List
      {...props}
      className={`${colophonClassName} ${className}`}
      isInline
      spacing="xxs"
    >
      <>
        {copyright ? (
          <ListItem className={styles.item}>{copyright}</ListItem>
        ) : null}
        {legalNotice ? (
          <ListItem className={styles.item}>
            <Link to={legalNotice.link}>{legalNotice.label}</Link>
          </ListItem>
        ) : null}
        {generator ? (
          <ListItem className={styles.item}>{generator}</ListItem>
        ) : null}
      </>
    </List>
  );
};

import type { FC, HTMLAttributes, ReactElement } from 'react';
import type {
  ButtonProps,
  HeadingProps,
  ImageProps,
  LinkProps,
} from '../../atoms';
import * as styles from './card.css';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  actions?:
    | ReactElement<ButtonProps>
    | ReactElement<LinkProps>
    | Array<ReactElement<ButtonProps | LinkProps>>;
  cover?: ReactElement<ImageProps>;
  excerpt?: string;
  heading?: ReactElement<HeadingProps>;
};

/**
 * Card component.
 */
export const Card: FC<CardProps> = ({
  actions,
  children,
  className = '',
  cover,
  excerpt,
  heading,
  ...props
}) => {
  const cardClassName = styles.card({});

  return (
    <div {...props} className={`${cardClassName} ${className}`}>
      {cover ? <div className={styles.cover}>{cover}</div> : null}
      {heading ? <div className={styles.heading}>{heading}</div> : null}
      {excerpt ? <div className={styles.excerpt}>{excerpt}</div> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
};
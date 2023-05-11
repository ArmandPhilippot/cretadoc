import type { FC, HTMLAttributes, ReactElement } from 'react';
import {
  Article,
  type ButtonProps,
  Footer,
  Header,
  type HeadingProps,
  type ImageProps,
  type LinkProps,
  type ButtonLinkProps,
} from '../../atoms';
import * as styles from './card.css';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  actions?:
    | ReactElement<ButtonProps>
    | ReactElement<ButtonLinkProps>
    | ReactElement<LinkProps>
    | Array<ReactElement<ButtonProps | ButtonLinkProps | LinkProps>>;
  cover?: ReactElement<ImageProps>;
  excerpt?: string;
  heading: ReactElement<HeadingProps>;
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
    <Article {...props} className={`${cardClassName} ${className}`}>
      <Header className={styles.header}>
        {cover ? <div className={styles.cover}>{cover}</div> : null}
        {heading}
      </Header>
      {excerpt ? <div className={styles.excerpt}>{excerpt}</div> : null}
      {actions ? <Footer className={styles.footer}>{actions}</Footer> : null}
    </Article>
  );
};

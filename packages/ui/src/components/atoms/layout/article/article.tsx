import type { FC, HTMLAttributes, ReactNode } from 'react';

export type ArticleProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

/**
 * Article component.
 */
export const Article: FC<ArticleProps> = (props) => <article {...props} />;

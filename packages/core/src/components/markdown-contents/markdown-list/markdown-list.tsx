import { List } from '@cretadoc/ui';
import type { ReactNode } from 'react';

export type MarkdownListProps = {
  children: ReactNode;
  [x: string]: unknown;
};

export const MarkdownList = ({
  children,
  node,
  ordered,
  ...props
}: MarkdownListProps) => <List {...props}>{children}</List>;

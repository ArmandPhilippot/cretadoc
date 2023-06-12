import { List } from '@cretadoc/ui';
import type { ReactNode } from 'react';

export type MarkdownOrderedListProps = {
  children: ReactNode;
  [x: string]: unknown;
};

export const MarkdownOrderedList = ({
  children,
  node,
  ordered,
  ...props
}: MarkdownOrderedListProps) => (
  <List {...props} isOrdered>
    {children}
  </List>
);

import { ListItem } from '@cretadoc/ui';
import type { ReactNode } from 'react';

export type MarkdownListItemProps = {
  children: ReactNode;
  [x: string]: unknown;
};

export const MarkdownListItem = ({
  children,
  node,
  ordered,
  ...props
}: MarkdownListItemProps) => <ListItem {...props}>{children}</ListItem>;

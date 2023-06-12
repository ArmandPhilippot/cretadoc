import { Link } from '@cretadoc/ui';
import type { ReactNode } from 'react';

export type MarkdownLinkProps = {
  children: ReactNode;
  href?: string;
  [x: string]: unknown;
};

export const MarkdownLink = ({
  children,
  href,
  node,
  ...props
}: MarkdownLinkProps) => (
  <Link {...props} to={href ?? ''}>
    {children}
  </Link>
);

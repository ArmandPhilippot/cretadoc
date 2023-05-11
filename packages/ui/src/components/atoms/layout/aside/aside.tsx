import type { FC, HTMLAttributes, ReactNode } from 'react';

export type AsideProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

/**
 * Aside component.
 */
export const Aside: FC<AsideProps> = (props) => <aside {...props} />;

import type { FC, HTMLAttributes } from 'react';

export type NavProps = HTMLAttributes<HTMLElement>;

/**
 * Nav component.
 */
export const Nav: FC<NavProps> = (props) => <nav {...props} />;

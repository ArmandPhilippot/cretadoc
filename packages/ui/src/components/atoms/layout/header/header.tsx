import type { FC, HTMLAttributes } from 'react';

export type HeaderProps = HTMLAttributes<HTMLElement>;

/**
 * Header component.
 */
export const Header: FC<HeaderProps> = (props) => <header {...props} />;

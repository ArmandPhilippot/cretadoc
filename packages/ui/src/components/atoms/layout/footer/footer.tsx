import type { FC, HTMLAttributes } from 'react';

export type FooterProps = HTMLAttributes<HTMLElement>;

/**
 * Footer component.
 */
export const Footer: FC<FooterProps> = (props) => <footer {...props} />;

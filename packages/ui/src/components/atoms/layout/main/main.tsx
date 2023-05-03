import type { FC, HTMLAttributes } from 'react';

export type MainProps = HTMLAttributes<HTMLElement>;

/**
 * Main component.
 */
export const Main: FC<MainProps> = (props) => <main {...props} />;

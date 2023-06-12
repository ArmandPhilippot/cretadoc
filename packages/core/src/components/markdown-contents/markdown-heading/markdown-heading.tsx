import { Heading, type HeadingLevel } from '@cretadoc/ui';
import type { ReactNode } from 'react';

const isValidLevel = (level: number): level is HeadingLevel => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const validLevels = [1, 2, 3, 4, 5, 6];

  return validLevels.includes(level);
};

export type MarkdownHeadingProps = {
  children: ReactNode;
  level: number;
  [x: string]: unknown;
};

export const MarkdownHeading = ({
  children,
  level,
  node,
  ...props
}: MarkdownHeadingProps) => {
  if (!isValidLevel(level))
    throw new Error(
      `Expected level to be 1, 2, 3, 4, 5 or 6. Received: ${level}`
    );

  return (
    <Heading {...props} level={level}>
      {children}
    </Heading>
  );
};

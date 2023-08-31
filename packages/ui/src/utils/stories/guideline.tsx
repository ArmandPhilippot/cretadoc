import type { FC, ReactNode } from 'react';
import { Preview } from './preview';

type GuidelineKind = 'good' | 'bad';

export type GuidelineProps = {
  children: ReactNode;
  kind: GuidelineKind;
};

export const Guideline: FC<GuidelineProps> = ({ children, kind }) => {
  const isGoodExample = kind === 'good';
  const title = isGoodExample ? 'Do' : "Don't";

  return (
    <Preview title={title} titleColor={isGoodExample ? 'success' : 'critical'}>
      {children}
    </Preview>
  );
};

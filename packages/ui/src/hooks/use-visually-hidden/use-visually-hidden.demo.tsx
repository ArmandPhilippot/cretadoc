import type { FC, ReactNode } from 'react';
import { Box } from '../utils/components';
import { useVisuallyHidden } from './use-visually-hidden';

export type UseVisuallyHiddenDemoProps = {
  children: ReactNode;
  isFocusable?: boolean;
};

export const UseVisuallyHiddenDemo: FC<UseVisuallyHiddenDemoProps> = ({
  children,
  isFocusable = false,
}) => {
  const visuallyHidden = useVisuallyHidden(isFocusable);

  return <Box className={visuallyHidden}>{children}</Box>;
};

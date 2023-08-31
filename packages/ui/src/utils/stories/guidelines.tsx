import type { FC, ReactNode } from 'react';
import * as styles from './guidelines.css';
import { PreviewList } from './preview-list';

export type GuidelinesProps = {
  children: ReactNode;
};

export const Guidelines: FC<GuidelinesProps> = ({ children }) => (
  <PreviewList className={styles.guidelines}>{children}</PreviewList>
);

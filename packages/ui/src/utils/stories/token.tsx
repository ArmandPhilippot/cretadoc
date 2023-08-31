import type { KeyPathIn } from '@cretadoc/utils';
import type { FC } from 'react';
import type { contract } from '../../themes';
import * as styles from './token.css';

export type TokenProps = {
  path: KeyPathIn<typeof contract>;
};

export const Token: FC<TokenProps> = ({ path }) => (
  <code className={styles.token}>{path}</code>
);

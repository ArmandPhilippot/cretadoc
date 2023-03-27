import type { KeyPathIn } from '@cretadoc/utils';
import type { FC, HTMLAttributes } from 'react';
import type { contract } from '../../contract';
import * as styles from './preview.css';

export type PreviewProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> & {
  token: KeyPathIn<typeof contract>;
};

/**
 * Preview component
 */
export const Preview: FC<PreviewProps> = ({
  children,
  className = '',
  token,
  ...props
}) => {
  const previewClassName = `${styles.preview} ${className}`;

  return (
    <div className={styles.wrapper}>
      <div {...props} className={previewClassName}>
        {children}
      </div>
      <code className={styles.token}>{token}</code>
    </div>
  );
};

import type { KeyPathIn } from '@cretadoc/utils';
import type { FC, HTMLAttributes } from 'react';
import type { contract } from '../../contract';
import * as styles from './preview.css';

export type PreviewProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> & {
  /**
   * @default 'stack'
   */
  orientation?: `inline` | 'stack';
  token: KeyPathIn<typeof contract>;
};

/**
 * Preview component
 */
export const Preview: FC<PreviewProps> = ({
  children,
  className = '',
  orientation = 'stack',
  token,
  ...props
}) => {
  const previewClassName = `${styles.preview} ${className}`;
  const wrapperClassName = styles.wrapper({ orientation });

  return (
    <div className={wrapperClassName}>
      <code className={styles.token}>{token}</code>
      <div {...props} className={previewClassName}>
        {children}
      </div>
    </div>
  );
};

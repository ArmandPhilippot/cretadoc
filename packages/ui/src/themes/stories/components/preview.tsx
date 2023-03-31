import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
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
  /**
   * The min-height in pixels.
   */
  minHeight?: number;
  orientation?: `inline` | 'stack';
  token?: KeyPathIn<typeof contract>;
};

/**
 * Preview component
 */
export const Preview: FC<PreviewProps> = ({
  children,
  className = '',
  minHeight,
  orientation = 'stack',
  token,
  ...props
}) => {
  const hasMinHeight = !!minHeight;
  const childClassName = `${styles.child({ hasMinHeight })} ${className}`;
  const wrapperClassName = styles.wrapper({ orientation });
  const wrapperStyles = minHeight
    ? assignInlineVars({ [styles.minHeight]: `${minHeight}px` })
    : {};

  return (
    <div className={wrapperClassName} style={wrapperStyles}>
      {token ? <code className={styles.token}>{token}</code> : null}
      <div {...props} className={childClassName}>
        {children}
      </div>
    </div>
  );
};

import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes } from 'react';
import { getColorFromTokenKey } from '../../../components/utils/helpers';
import type { contract } from '../../contract';
import type { ColorContextTokens } from '../../types/tokens';
import * as styles from './preview.css';

export type PreviewProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> & {
  /**
   * Add a label before the token or preview contents.
   */
  label?: string;
  labelColor?: keyof ColorContextTokens | 'primary';
  /**
   * The min-height in pixels.
   */
  minHeight?: number;
  /**
   * The orientation of the children inside the preview.
   *
   * @default 'stack'
   */
  orientation?: `inline` | 'stack';
  /**
   * The previewed code.
   */
  token?: KeyPathIn<typeof contract>;
};

/**
 * Preview component
 */
export const Preview: FC<PreviewProps> = ({
  children,
  className = '',
  label,
  labelColor,
  minHeight,
  orientation = 'stack',
  token,
  ...props
}) => {
  const hasMinHeight = !!minHeight;
  const childClassName = `${styles.child({ hasMinHeight })} ${className}`;
  const wrapperClassName = styles.wrapper({ orientation });
  const wrapperStyles = assignInlineVars({
    [styles.labelColor]: labelColor
      ? getColorFromTokenKey(labelColor, 'foreground')
      : '',
    [styles.minHeight]: minHeight ? `${minHeight}px` : '',
  });

  return (
    <div className={wrapperClassName} style={wrapperStyles}>
      {label ? <div className={styles.label}>{label}</div> : null}
      {token ? <code className={styles.token}>{token}</code> : null}
      <div {...props} className={childClassName}>
        {children}
      </div>
    </div>
  );
};

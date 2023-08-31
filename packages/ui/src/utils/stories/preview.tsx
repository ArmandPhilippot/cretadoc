import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { contract } from '../../themes';
import type { ColorContextTokens } from '../../types';
import { getColorFromContract } from '../helpers';
import * as styles from './preview.css';

export type PreviewProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'title'
> & {
  children: ReactNode;
  isInline?: boolean;
  title?: string;
  titleColor?: keyof ColorContextTokens | 'primary';
};

export const Preview: FC<PreviewProps> = ({
  children,
  className = '',
  isInline = false,
  title,
  titleColor = 'regular',
  ...props
}) => {
  const wrapperClassName = `${styles.wrapper({ isInline })} ${className}`;
  const titleStyles = assignInlineVars({
    [styles.titleColor]: getColorFromContract(
      contract,
      titleColor,
      'foreground'
    ),
  });

  return (
    <div {...props} className={wrapperClassName}>
      {title ? (
        <div className={styles.title} style={titleStyles}>
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
};

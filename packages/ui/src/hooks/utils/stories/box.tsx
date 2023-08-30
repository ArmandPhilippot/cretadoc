import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
} from 'react';
import * as styles from './box.css';

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  hasOverflowX?: boolean;
  hasOverflowY?: boolean;
  isAlwaysScrollable?: boolean;
};

export const BoxWithRef: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  {
    children,
    className = '',
    hasOverflowX = false,
    hasOverflowY = false,
    isAlwaysScrollable = false,
    style,
    ...props
  },
  ref
) => (
  <div
    {...props}
    className={`${styles.box} ${className}`}
    ref={ref}
    style={{
      ...style,
      overflow: isAlwaysScrollable ? 'scroll' : 'auto',
    }}
  >
    {children}
    <div
      style={{
        ...(hasOverflowY ? { minHeight: '100vh' } : {}),
        ...(hasOverflowX ? { minWidth: '100vw' } : {}),
      }}
      // cspell:ignore-word noninteractive
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={
        hasOverflowX || hasOverflowY || isAlwaysScrollable ? 0 : undefined
      }
    />
  </div>
);

export const Box = forwardRef(BoxWithRef);

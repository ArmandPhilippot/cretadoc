import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
} from 'react';
import * as styles from './box.css';

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  hasOverflow?: boolean;
  isAlwaysScrollable?: boolean;
};

export const BoxWithRef: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  {
    children,
    className = '',
    hasOverflow = false,
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
    <div style={hasOverflow ? { minHeight: '100vh' } : {}} />
  </div>
);

export const Box = forwardRef(BoxWithRef);

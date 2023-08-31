import {
  type FC,
  useRef,
  type HTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { Preview, PreviewList } from '../../utils/stories';
import { useScrollBarWidth } from './use-scrollbar-width';
import * as styles from './use-scrollbar-width.demo.css';

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  hasOverflowY?: boolean;
  isAlwaysScrollable?: boolean;
};

const BoxWithRef: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  {
    children,
    className = '',
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
      }}
      // cspell:ignore-word noninteractive
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={hasOverflowY || isAlwaysScrollable ? 0 : undefined}
    />
  </div>
);

const Box = forwardRef(BoxWithRef);

export const UseScrollbarWidthDemo: FC = () => {
  const scrollbarWidth = useScrollBarWidth();
  const divRef = useRef<HTMLDivElement>(null);
  const divScrollbarWidth = useScrollBarWidth(divRef);
  const divOverflowRef = useRef<HTMLDivElement>(null);
  const divOverflowScrollbarWidth = useScrollBarWidth(divOverflowRef);
  const divScrollRef = useRef<HTMLDivElement>(null);
  const divScrollScrollbarWidth = useScrollBarWidth(divScrollRef);

  return (
    <PreviewList>
      <Preview className={styles.preview} title="Window scrollbar">
        <p>The scrollbar width of the window is: {scrollbarWidth}</p>
        <p>
          <small>(Tip: resize the window to update the value.)</small>
        </p>
      </Preview>
      <Preview
        className={styles.preview}
        title='Div without "overflow: auto" and no children overflow'
      >
        <Box ref={divRef}>
          The scrollbar width of this box is: {divScrollbarWidth}
        </Box>
      </Preview>
      <Preview
        className={styles.preview}
        title='Div with "overflow: auto" and children overflow'
      >
        <Box hasOverflowY ref={divOverflowRef}>
          The scrollbar width of this box is: {divOverflowScrollbarWidth}
        </Box>
      </Preview>
      <Preview
        className={styles.preview}
        title='Div with "overflow: scroll" and no children overflow'
      >
        <Box isAlwaysScrollable ref={divScrollRef}>
          The scrollbar width of this box is: {divScrollScrollbarWidth}
        </Box>
      </Preview>
    </PreviewList>
  );
};

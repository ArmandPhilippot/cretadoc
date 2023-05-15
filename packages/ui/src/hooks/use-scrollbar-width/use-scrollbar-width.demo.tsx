import { type FC, useRef } from 'react';
import { Box, Demo, DemoPanel } from '../utils/components';
import { useScrollBarWidth } from './use-scrollbar-width';

export const UseScrollbarWidthDemo: FC = () => {
  const scrollbarWidth = useScrollBarWidth();
  const divRef = useRef<HTMLDivElement>(null);
  const divScrollbarWidth = useScrollBarWidth(divRef);
  const divOverflowRef = useRef<HTMLDivElement>(null);
  const divOverflowScrollbarWidth = useScrollBarWidth(divOverflowRef);
  const divScrollRef = useRef<HTMLDivElement>(null);
  const divScrollScrollbarWidth = useScrollBarWidth(divScrollRef);

  return (
    <Demo isGrid>
      <DemoPanel heading="Window scrollbar">
        <p>The scrollbar width of the window is: {scrollbarWidth}</p>
        <p>
          <small>(Tip: resize the window to update the value.)</small>
        </p>
      </DemoPanel>
      <DemoPanel heading='Div without "overflow: auto" and no children overflow'>
        <Box ref={divRef}>
          The scrollbar width of this box is: {divScrollbarWidth}
        </Box>
      </DemoPanel>
      <DemoPanel heading='Div with "overflow: auto" and children overflow'>
        <Box hasOverflow ref={divOverflowRef}>
          The scrollbar width of this box is: {divOverflowScrollbarWidth}
        </Box>
      </DemoPanel>
      <DemoPanel heading='Div with "overflow: scroll" and no children overflow'>
        <Box isAlwaysScrollable ref={divScrollRef}>
          The scrollbar width of this box is: {divScrollScrollbarWidth}
        </Box>
      </DemoPanel>
    </Demo>
  );
};

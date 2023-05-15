import { type FC, useRef } from 'react';
import { Box, Demo, DemoPanel } from '../utils/components';
import { useScrollPosition } from './use-scroll-position';

export const UseScrollPositionDemo: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const { x: windowX, y: windowY } = useScrollPosition();
  const { x: divX, y: divY } = useScrollPosition(divRef);

  return (
    <Demo>
      <DemoPanel
        heading="Window scroll position"
        style={{ minHeight: '100vh' }}
      >
        <ul style={{ padding: 0, listStyleType: 'none' }}>
          <li aria-label="Window position X">x: {windowX}</li>
          <li aria-label="Window position Y">y: {windowY}</li>
        </ul>
        <p>If you do not see the body scrollbar, please resize your window.</p>
      </DemoPanel>
      <DemoPanel heading="Div scroll position">
        <Box
          id="locked-div"
          hasOverflowX
          hasOverflowY
          ref={divRef}
          style={{ position: 'relative' }}
        >
          <div style={{ position: 'sticky', left: 0, top: '1rem' }}>
            <ul style={{ padding: 0, listStyleType: 'none' }}>
              <li aria-label="Div position X">x: {divX}</li>
              <li aria-label="Div position Y">y: {divY}</li>
            </ul>
          </div>
        </Box>
      </DemoPanel>
    </Demo>
  );
};

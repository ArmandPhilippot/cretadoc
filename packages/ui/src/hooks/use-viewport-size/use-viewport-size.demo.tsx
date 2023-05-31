import type { FC } from 'react';
import { Demo, DemoPanel } from '../utils/components';
import { useViewportSize } from './use-viewport-size';

export const UseViewportSizeDemo: FC = () => {
  const viewportSize = useViewportSize();

  return (
    <Demo>
      <DemoPanel>
        <p>Resize the browser window to update the values.</p>
        <ul>
          <li>
            Viewport height: <strong>{viewportSize.height}</strong>
          </li>
          <li>
            Viewport width: <strong>{viewportSize.width}</strong>
          </li>
        </ul>
      </DemoPanel>
    </Demo>
  );
};
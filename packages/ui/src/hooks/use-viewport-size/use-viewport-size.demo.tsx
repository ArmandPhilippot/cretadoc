import type { FC } from 'react';
import { Preview, PreviewList } from '../../utils/stories';
import { useViewportSize } from './use-viewport-size';

export const UseViewportSizeDemo: FC = () => {
  const viewportSize = useViewportSize();

  return (
    <PreviewList>
      <Preview>
        <p>Resize the browser window to update the values.</p>
        <ul>
          <li>
            Viewport height: <strong>{viewportSize.height}</strong>
          </li>
          <li>
            Viewport width: <strong>{viewportSize.width}</strong>
          </li>
        </ul>
      </Preview>
    </PreviewList>
  );
};

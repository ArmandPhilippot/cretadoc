import type { FC } from 'react';
import { Demo, DemoPanel } from '../utils/components';
import { useMatchMedia } from './use-match-media';

export type UseMatchMediaDemoProps = {
  /**
   * A valid media query.
   */
  query: string;
};

export const UseMatchMediaDemo: FC<UseMatchMediaDemoProps> = ({ query }) => {
  const isMatching = useMatchMedia(query);

  return (
    <Demo>
      <DemoPanel>
        <p>
          The query <code>${query}`</code>{' '}
          <strong>{isMatching ? 'matches' : 'does not match'}</strong>.
        </p>
      </DemoPanel>
    </Demo>
  );
};

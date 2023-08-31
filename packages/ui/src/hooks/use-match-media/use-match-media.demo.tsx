import type { FC } from 'react';
import { Preview, PreviewList } from '../../utils/stories';
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
    <PreviewList>
      <Preview>
        <p>
          The query <code>${query}`</code>{' '}
          <strong>{isMatching ? 'matches' : 'does not match'}</strong>.
        </p>
      </Preview>
    </PreviewList>
  );
};

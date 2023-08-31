import type { FC } from 'react';
import { Button } from '../../components';
import { Preview, PreviewList } from '../../utils/stories';
import { useToggle } from './use-toggle';

export const UseToggleDemo: FC = () => {
  const [state, toggle] = useToggle(false);

  return (
    <PreviewList>
      <Preview>
        <p>
          The current state is: <strong>{state ? 'true' : 'false'}</strong>
        </p>
        <Button onClick={toggle}>Toggle</Button>
      </Preview>
    </PreviewList>
  );
};

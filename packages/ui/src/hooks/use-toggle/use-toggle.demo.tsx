import type { FC } from 'react';
import { Demo, DemoPanel } from '../utils/components';
import { useToggle } from './use-toggle';

export const UseToggleDemo: FC = () => {
  const [state, toggle] = useToggle(false);

  return (
    <Demo>
      <DemoPanel>
        <p id="output">
          The current state is: <strong>{state ? 'true' : 'false'}</strong>
        </p>
        <button onClick={toggle} type="button">
          Toggle
        </button>
      </DemoPanel>
    </Demo>
  );
};

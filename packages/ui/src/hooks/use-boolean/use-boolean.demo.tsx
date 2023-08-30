import type { FC } from 'react';
import { Demo, DemoPanel } from '../utils/stories';
import { useBoolean } from './use-boolean';

export const UseBooleanDemo: FC = () => {
  const { activate, deactivate, state, toggle } = useBoolean(false);

  return (
    <Demo>
      <DemoPanel>
        <p id="output">
          The current state is: <strong>{state ? 'true' : 'false'}</strong>
        </p>
        <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '1rem' }}>
          <button onClick={activate} type="button">
            Activate
          </button>
          <button onClick={deactivate} type="button">
            Deactivate
          </button>
          <button onClick={toggle} type="button">
            Toggle
          </button>
        </div>
      </DemoPanel>
    </Demo>
  );
};

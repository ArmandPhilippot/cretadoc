import { useCallback, useState } from 'react';
import { IntlProvider } from 'react-intl';
import reactLogo from '../assets/react.svg';
import './app.css';
import { useConfig } from '../utils/hooks';

export const App = () => {
  const [count, setCount] = useState(0);
  const { name } = useConfig();

  const handleClick = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    []
  );

  return (
    <IntlProvider locale="en">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{name}: Vite + React</h1>
      <div className="card">
        <button onClick={handleClick} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </IntlProvider>
  );
};

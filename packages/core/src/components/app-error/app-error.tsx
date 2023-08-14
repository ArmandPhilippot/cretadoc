import type { FC } from 'react';
import * as styles from './app-error.css';

type AppErrorProps = {
  error?: unknown;
};

export const AppError: FC<AppErrorProps> = ({ error }) => {
  const pageTitle = 'Application error';
  const pageContent =
    "We're sorry, an error occurred while loading the application.";

  return (
    <div className={styles.container}>
      <h1>{pageTitle}</h1>
      <p>{pageContent}</p>
      {error instanceof Error ? (
        <details>
          <pre className={styles.pre}>{error.stack}</pre>
          <summary>{error.message}</summary>
        </details>
      ) : null}
    </div>
  );
};

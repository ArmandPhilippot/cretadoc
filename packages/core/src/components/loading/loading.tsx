import { Spinner, type SpinnerProps } from '@cretadoc/ui';
import type { FC } from 'react';
import * as styles from './loading.css';

export type LoadingProps = Omit<SpinnerProps, 'children'> & {
  msg?: string;
};

export const Loading: FC<LoadingProps> = ({
  className = '',
  msg,
  ...props
}) => {
  const spinnerClass = `${styles.spinner} ${className}`;

  return (
    <Spinner {...props} className={spinnerClass}>
      {msg}
    </Spinner>
  );
};

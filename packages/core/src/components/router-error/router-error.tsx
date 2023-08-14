import { useRouteError } from 'react-router-dom';
import { AppError } from '../app-error';

export const RouterError = () => {
  const err = useRouteError();

  return <AppError error={err} />;
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

/**
 * Custom hook to redirect to the 404 page if condition is met.
 *
 * @param {boolean} condition - The condition to redirect.
 */
export const use404If = (condition: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) navigate(ROUTES.NOT_FOUND, { replace: true });
  }, [condition, navigate]);
};

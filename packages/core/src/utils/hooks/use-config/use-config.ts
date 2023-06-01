import { useContext } from 'react';
import { ConfigContext } from '../../contexts';

export const useConfig = () => {
  const { config } = useContext(ConfigContext);

  return config;
};

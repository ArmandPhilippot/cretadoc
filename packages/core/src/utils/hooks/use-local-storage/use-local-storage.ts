import { isBrowser } from '@cretadoc/ui';
import type { Maybe } from '@cretadoc/utils';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { LocalStorage } from '../../../services';
import type { Validator } from '../../../types/internals';

export type UseLocalStorageReturn<T> = readonly [
  T,
  Dispatch<SetStateAction<T>>
];

/**
 * Use the local storage.
 *
 * @param {string} key - The storage local key.
 * @param {T} fallbackValue - A fallback value if local storage is empty.
 * @param {Validator} [validator] - A function to validate the stored value.
 * @returns {UseLocalStorageReturn<T>} A tuple with value and a setter.
 */
const useLocalStorage = <T>(
  key: string,
  fallbackValue: T,
  validator?: Validator<T>
): UseLocalStorageReturn<T> => {
  const getStoredValue = useCallback(() => {
    if (!isBrowser()) return fallbackValue;

    const stored = LocalStorage.get(key);

    if (validator) return validator<T>(stored) ? stored : fallbackValue;

    return (stored as Maybe<T>) ?? fallbackValue;
  }, [fallbackValue, key, validator]);

  const [value, setValue] = useState(getStoredValue());

  useEffect(() => {
    if (!isBrowser()) return;

    LocalStorage.set(key, value);
  }, [key, value]);

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key !== key) return;

      setValue(getStoredValue());
    },
    [getStoredValue, key]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [handleStorageChange]);

  return [value, setValue];
};

export default useLocalStorage;

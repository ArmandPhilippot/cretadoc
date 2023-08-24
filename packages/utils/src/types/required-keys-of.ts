import type { RemoveNeverKeysIn } from './remove-never-keys-in';

export type RequiredKeysOf<T> = RemoveNeverKeysIn<{
  [K in keyof T]-?: undefined extends T[K] ? never : T[K];
}>;

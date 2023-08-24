type FilteredKeysOf<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

/**
 * Create a new type from the given one by removing the keys with `never` type.
 *
 * Use-cases:
 * * use never without making the key optional in generic types
 */
export type RemoveNeverKeysIn<T> = {
  [K in FilteredKeysOf<T>]: T[K];
};

import type { RequiredKeysOf } from 'type-fest';

/**
 * Convert all optional keys of an object to nullable keys.
 *
 * The second parameter allow us to declare if the optional keys should remain
 * optional or not. Default is `false`.
 *
 * Use cases:
 * * be sure each keys in an object exists even if they are not defined,
 * * retrieve an object from a GraphQL API
 */
export type NullableOptionalKeysOf<
  T extends object,
  KeepOptional extends boolean = false
> = KeepOptional extends true
  ? {
      [K in keyof T]: K extends RequiredKeysOf<T> ? T[K] : T[K] | null;
    }
  : {
      [K in keyof T]-?: K extends RequiredKeysOf<T> ? T[K] : T[K] | null;
    };

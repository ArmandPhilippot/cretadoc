import type { KeyPathIn } from './key-path-in';

/**
 * Retrieve the type of the given key path.
 *
 * Use-cases:
 * * safe-type function that returns a value from a key path
 *
 * Example:
 *
 * `type ObjType = {foo: {bar: number}, baz: boolean};`
 *
 * `KeyPathValueIn<ObjType, 'baz'>` gives `boolean"`
 *
 * `KeyPathValueIn<ObjType, "foo.bar">` gives `number`
 */
export type KeyPathValueIn<
  O extends Record<string, unknown>,
  K extends KeyPathIn<O> = KeyPathIn<O>
> = K extends keyof O
  ? O[K]
  : K extends `${infer H}.${infer R}`
  ? H extends keyof O
    ? O[H] extends Record<string, unknown>
      ? R extends KeyPathIn<O[H]>
        ? KeyPathValueIn<O[H], R>
        : O[H]
      : never
    : never
  : never;

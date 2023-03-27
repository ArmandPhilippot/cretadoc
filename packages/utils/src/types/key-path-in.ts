/**
 * Get an union of key paths in the given object type.
 *
 * It is also possible to filter a branch of the object by specifying an
 * existing key.
 *
 * Use-cases:
 * * retrieve the value of a nested key in the given object
 *
 * Example:
 *
 * `type ObjType = {foo: {bar: number}, baz: boolean};`
 *
 * `KeyPathIn<ObjType>` gives `"baz" | "foo" | "foo.bar"`
 *
 * `KeyPathIn<ObjType, "foo">` gives `"foo" | "foo.bar"`
 */
export type KeyPathIn<
  O extends Record<string, unknown>,
  K extends keyof O = keyof O
> = K extends string
  ? O[K] extends Record<string, unknown>
    ? K | `${K}.${KeyPathIn<O[K], keyof O[K]>}`
    : K
  : never;

import type { RemoveNeverKeysIn } from './remove-never-keys-in';

/**
 * The real logic resides here but it is not working when we use
 * `RemoveNeverKeysIn` directly.
 */
type GetCommonKeysOf<Obj1 extends Record<PropertyKey, unknown>, Obj2> = {
  [K in keyof Obj1]: K extends keyof Obj2 ? Obj1[K] : never;
};

/**
 * Create a new type using the keys of the first type that are present also
 * present in the second one.
 *
 * Use-cases:
 * * create a subtype from two types.
 */
export type CommonKeysOf<
  Obj1 extends Record<PropertyKey, unknown>,
  Obj2
> = RemoveNeverKeysIn<GetCommonKeysOf<Obj1, Obj2>>;

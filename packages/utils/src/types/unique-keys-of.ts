import type { RemoveNeverKeysIn } from './remove-never-keys-in';

/**
 * The real logic resides here but it is not working when we use
 * `RemoveNeverKeysIn` directly.
 */
type GetUniqueKeysOf<Obj1 extends Record<PropertyKey, unknown>, Obj2> = {
  [K in keyof Obj1]: K extends keyof Obj2 ? never : Obj1[K];
};

/**
 * Create a new type using the keys of the first type that are not present in
 * the second one.
 *
 * Use-cases:
 * * create a subtype from two types.
 */
export type UniqueKeysOf<
  Obj1 extends Record<PropertyKey, unknown>,
  Obj2
> = RemoveNeverKeysIn<GetUniqueKeysOf<Obj1, Obj2>>;

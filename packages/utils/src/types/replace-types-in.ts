/**
 * Replace the type for each key of an object type.
 *
 * Use cases:
 * * two objects need the same structure but the keys should not have the same
 *   type
 */
export type ReplaceTypesIn<T, NewType> = {
  [K in keyof T]: T[K] extends object ? ReplaceTypesIn<T[K], NewType> : NewType;
};

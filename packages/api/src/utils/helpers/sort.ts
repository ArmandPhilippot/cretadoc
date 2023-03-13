/**
 * Method to sort an array of objects by property of number type.
 *
 * @param {P} prop - The object sorting property.
 * @param {O1} a - The first object to compare.
 * @param {O2} b - The second object to compare.
 * @returns {number} The method result.
 */
export const byNumberProp = <
  P extends PropertyKey,
  O1 extends Record<P, number>,
  O2 extends Record<P, number>
>(
  prop: P,
  a: O1,
  b: O2
): number => a[prop] - b[prop];

/**
 * Method to sort an array of object by property of string type.
 *
 * @param {P} prop - The object sorting property.
 * @param {O1} a - The first object to compare.
 * @param {O2} b - The second object to compare.
 * @returns {number} The method result.
 */
export const byNonAsciiStringProp = <
  P extends PropertyKey,
  O1 extends Record<P, string>,
  O2 extends Record<P, string>
>(
  prop: P,
  a: O1,
  b: O2
): number => a[prop].localeCompare(b[prop], undefined, { numeric: true });

/**
 * Method to sort an array of object using `createdAt` property.
 *
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @returns {number} The method result.
 */
export const byCreatedAtProp = <T extends { createdAt: string }>(
  a: T,
  b: T
): number =>
  byNumberProp(
    'createdAt',
    { ...a, createdAt: new Date(a.createdAt).getTime() },
    { ...b, createdAt: new Date(b.createdAt).getTime() }
  );

/**
 * Method to sort an array of object using `name` property.
 *
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @returns {number} The method result.
 */
export const byNameProp = <T extends { name: string }>(a: T, b: T): number =>
  byNonAsciiStringProp('name', a, b);

/**
 * Method to sort an array of object using `updatedAt` property.
 *
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @returns {number} The method result.
 */
export const byUpdatedAtProp = <T extends { updatedAt: string }>(
  a: T,
  b: T
): number =>
  byNumberProp(
    'updatedAt',
    { ...a, updatedAt: new Date(a.updatedAt).getTime() },
    { ...b, updatedAt: new Date(b.updatedAt).getTime() }
  );

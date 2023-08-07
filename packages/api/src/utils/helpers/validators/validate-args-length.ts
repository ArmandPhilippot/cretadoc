import type { Maybe } from '@cretadoc/utils';
import { MESSAGES } from '../../constants';

type InvalidArgsLength =
  | typeof MESSAGES.NOT_ENOUGH_ARGS
  | typeof MESSAGES.TOO_MANY_ARGS;

/**
 * Validate the length of the given arguments.
 *
 * @param {T} obj - An object containing the arguments.
 * @param {number} expectedLength - The expected arguments length.
 * @returns {Maybe<InvalidArgsLength>} Maybe an error message.
 */
export const validateArgsLength = <T extends Record<PropertyKey, unknown>>(
  obj: T,
  expectedLength: number
): Maybe<InvalidArgsLength> => {
  const keys = Object.keys(obj);

  if (keys.length < expectedLength) return MESSAGES.NOT_ENOUGH_ARGS;
  if (keys.length > expectedLength) return MESSAGES.TOO_MANY_ARGS;
  return undefined;
};

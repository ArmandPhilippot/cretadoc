import type { ValidationErrors } from '../../types';

/**
 * Init the validation errors.
 *
 * @param {T} obj - The object to validate.
 * @returns {ValidationErrors<T>} An object with all properties to validate.
 */
export const initValidationErrors = <T extends Record<string, unknown>>(
  obj: T
): ValidationErrors<T> => {
  const keyErrors = Object.keys(obj).map<[keyof T, string[]]>((key) => [
    key,
    [],
  ]);

  return Object.fromEntries<string[]>(keyErrors) as ValidationErrors<T>;
};

/**
 * Check if any property has validation errors.
 *
 * @param {ValidationErrors<T>} obj - The validation errors object.
 * @returns {boolean} True if at least one property has errors.
 */
export const hasValidationErrors = <T>(obj: ValidationErrors<T>): boolean =>
  Object.values<string[]>(obj).some((errors) => errors.length > 0);

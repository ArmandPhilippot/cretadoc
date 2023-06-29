import validator from 'validator';

/**
 * Validate a date.
 *
 * @param {string} date - The date to validate.
 * @param {string} [format]  - The expected date format
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateDate = (date: string, format = 'YYYY-MM-DD'): string[] => {
  const errors: string[] = [];

  if (!validator.isDate(date, { format }))
    errors.push(`Invalid date format, should be ${format}`);

  return errors;
};

/**
 * Validate a time compared to `HH:MM:SS` format.
 *
 * @param {string} time - The time to validate.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateTime = (time: string): string[] => {
  const errors: string[] = [];

  if (!validator.isTime(time, { hourFormat: 'hour24', mode: 'withSeconds' }))
    errors.push(`Invalid time format, should be HH:MM:SS`);

  return errors;
};

/**
 * Validate a date with time.
 *
 * @param {string} dateTime - The datetime to validate.
 * @param {string} [format]  - The expected date format
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateDateTime = (
  dateTime: string,
  format = 'YYYY-MM-DD'
): string[] => {
  const [date, time, ..._rest] = dateTime.split(' ');

  if (!date)
    return [
      `Invalid date, expected one of these formats: ${format} or ${format} HH:MM:SS`,
    ];

  const errors = [...validateDate(date, format)];

  if (time) errors.push(...validateTime(time));

  return errors;
};

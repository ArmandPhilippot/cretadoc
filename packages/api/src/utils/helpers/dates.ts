/**
 * Format a date part to a two digits string.
 *
 * @param {number} value - A date or time part.
 * @returns {string} The formatted date part.
 */
const getFormattedDatePart = (value: number): string => {
  const twoLastDigits = -2;

  return `0${value}`.slice(twoLastDigits);
};

/**
 * Transform a Date to a datetime using `YYYY/MM/DD HH:MM:SS` format.
 *
 * @param {Date} date - A date.
 * @returns {string} The datetime.
 */
export const getDatetimeFormat = (date: Date): string => {
  const year = date.getFullYear();
  // Month starts at 0 (January corresponds to 0) so we need to add 1.
  const month = getFormattedDatePart(date.getMonth() + 1);
  const day = getFormattedDatePart(date.getDate());
  const hours = getFormattedDatePart(date.getHours());
  const minutes = getFormattedDatePart(date.getMinutes());
  const seconds = getFormattedDatePart(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

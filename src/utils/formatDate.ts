/**
 *
 * Takes a string date value, and returns the date in a friendly format, e.g. Monday (13/02/2025)
 *
 * @param dateString string
 * @returns string | undefined
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (!date) {
    return undefined;
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

  const [weekday, dayMonthYear] = formattedDate.split(', ');
  const [day, month, year] = dayMonthYear.split('/');
  return `${weekday} ${day}/${month}/${year}`;
};

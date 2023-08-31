export function convertToRuFormat(dateStr: string) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
      throw new Error('Invalid date format');
  }
  const [year, day, month] = parts;
  return `${day}.${month}.${year}`;
}
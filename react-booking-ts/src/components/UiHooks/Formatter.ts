const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export const CurrencyFormatter = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
};

export const CommaFormatter = (number: number) => {
  return number.toLocaleString('en-US');
};

export const DateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const TimeFormatter = (date: string) => {
  return new Date(date).toLocaleTimeString();
};

export const DateTimeFormatter = (date: Date) => {
  return date.toLocaleDateString('en-US', options);
};

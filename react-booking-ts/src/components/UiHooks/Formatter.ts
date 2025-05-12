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

export const TimestampTzFormatter = (date: Date) => {
  const timestamptz = date;
  const datetz = new Date(timestamptz);
  const formattedDate = `${(datetz.getMonth() + 1).toString().padStart(2, '0')}/${datetz
    .getDate()
    .toString()
    .padStart(2, '0')}/${datetz.getFullYear()} ${datetz.getHours().toString().padStart(2, '0')}:${datetz
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
};

interface extras {
  service: string;
  price: number;
}

export const extrasReducer = (value: extras[]) => {
  const totalPrice = value.reduce((a, b) => a + b.price, 0);
  return CurrencyFormatter(totalPrice);
};

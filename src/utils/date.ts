import { format } from 'date-fns';

export const formatDate = (date: Date | string) => format(new Date(date), 'PP');
export const formatTime = (date: Date | string) => format(new Date(date), 'p');

export const isLate = (timestamp: Date | string) => {
  const date = new Date(timestamp);
  return date.getHours() >= 9;
};
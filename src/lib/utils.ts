import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
};

export const dummyArray = (length: number) => {
  return Array.from({ length: length || 5 });
};

export const formatDateLong = (date: Date) => {
  return format(date, 'PPP');
};

export function getInitials(fullName: string | null): string {
  if (!fullName) return 'U';

  const names = fullName.trim().split(/\s+/);
  if (names.length === 1) {
    return names[0][0].toUpperCase();
  } else if (names.length === 2) {
    return names.map(name => name[0].toUpperCase()).join('');
  } else {
    return `${names[0][0].toUpperCase()}${names[
      names.length - 1
    ][0].toUpperCase()}`;
  }
}

export function truncateString(value: string) {
  return value.substring(0, 49) + '...';
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const PAGE_SIZE = 10;

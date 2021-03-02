import { formatRelative, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

export function dateFormatted(date: string): string {
  return formatRelative(subHours(new Date(date), 3), new Date(), {
    locale: pt,
  });
}

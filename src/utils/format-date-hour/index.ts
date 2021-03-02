import { format, isValid } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function dateHourFormatted(date: string): string {
  return isValid(new Date(date))
    ? format(new Date(date), 'dd/MMM HH:mm', {
        locale: ptBR,
      })
    : date;
}

export function onlyLetters(input: string | number): string {
  return String(input)
    .normalize('NFD')
    .replace(/([\u0300-\u036f]|[^a-zA-Z\s])/g, '');
}

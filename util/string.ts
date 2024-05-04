export function convertCamelToSnake(source: string) {
  return source.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

export function convertCamelToKebab(source: string) {
  return source.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

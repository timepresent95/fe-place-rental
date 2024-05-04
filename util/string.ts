export function convertCamelToSnake(source: string) {
  return source.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

export function convertCamelToKebab(source: string) {
  return source.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function convertSnakeToCamel(source: string) {
  return source.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace(/[-_]/, "")
  );
}

export function convertKebabToCamel(source: string) {
  return source.replace(/([-][a-z])/g, (group) =>
    group.toUpperCase().replace(/[-]/, "")
  );
}

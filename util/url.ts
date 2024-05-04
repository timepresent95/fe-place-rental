type OptionType = string | number | boolean;

interface Options {
  param?: { [key: string]: OptionType };
  query?: { [key: string]: OptionType | OptionType[] };
}
export function createUrl(path: string, options?: Options) {
  const url = path
    .split("/")
    .map((v) => {
      if (options?.param === undefined) {
        return v;
      }

      if (v[0] === ":" && options.param[v.slice(1)]) {
        return options.param[v.slice(1)];
      }
      return v;
    })
    .join("/");

  const query =
    options?.query === undefined
      ? []
      : Object.entries(options.query).map(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => `${key}=${v}`).join("&")
            : `${key}=${value}`
        );

  return `${url}${query.length === 0 ? "" : query.join("&")}`;
}

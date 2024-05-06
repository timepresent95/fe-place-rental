import { convertCamelToKebab, convertCamelToSnake } from "./string";

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
      ? ""
      : Object.entries(options.query).reduce((acc, [key, value]) => {
          if (value === undefined) {
            return acc;
          }

          const prefix = acc === "" ? "?" : "&";
          const snakeKey = convertCamelToSnake(key);

          return (
            prefix +
            (Array.isArray(value)
              ? value
                  .map(
                    (v) => `${snakeKey}=${convertCamelToKebab(v.toString())}`
                  )
                  .join("&")
              : `${snakeKey}=${convertCamelToKebab(value.toString())}`)
          );
        }, "");

  return url + query;
}

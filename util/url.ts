interface Options {
  params: { [key: string]: string };
}
export function createUrl(path: string, options: Options) {
  const { params } = options;
  return path
    .split("/")
    .map((v) => (v[0] === ":" && params[v.slice(1)] ? params[v.slice(1)] : v))
    .join("/");
}

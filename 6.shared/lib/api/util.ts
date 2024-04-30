export function generateUrl(path: string, params: { [key: string]: string }) {
  return path
    .split("/")
    .map((v) => {
      if (v[0] === ":") {
        return { isParameter: true, value: v.slice(1) };
      }
      return { isParameter: false, value: v };
    })
    .map((v) => {
      if (v.isParameter && params[v.value]) {
        return params[v.value];
      }
      return v.value;
    })
    .join("/");
}

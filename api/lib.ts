import { ensureExists } from "@/util/\btypeSafety";

const baseUrl = ensureExists(
  process.env.NEXT_PUBLIC_API_URL,
  "api base url is not defined"
);

type ApiResult<T> = { status: "error" } | { status: "success"; data: T };

export async function fetchAction<T>(
  url: string,
  reqInit?: RequestInit
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(baseUrl + url, reqInit);

    if (!res.ok) {
      return { status: "error" };
    }

    const data: T = await res.json();

    return { status: "success", data };
  } catch (error) {
    return { status: "error" };
  }
}

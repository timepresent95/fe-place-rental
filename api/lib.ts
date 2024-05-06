import { mswAction } from "@/msw/lib/lib";
import { ensureExists } from "@/util/\btypeSafety";

export type ApiResult<T> = { status: "error" } | { status: "success"; data: T };

export async function fetchAction<T>(
  url: string,
  reqInit?: RequestInit
): Promise<ApiResult<T>> {
  try {
    if (
      process.env.NEXT_PUBLIC_MOCKING === "true" &&
      typeof window !== "undefined"
    ) {
      //NOTE: msw 실행 환경에 상관 없이 동일한 mock data 보장을 위한 로직
      return mswAction(url, reqInit);
    }

    const res = await fetch(url, reqInit);

    if (!res.ok) {
      return { status: "error" };
    }

    const data: T = await res.json();

    return { status: "success", data };
  } catch (error) {
    return { status: "error" };
  }
}

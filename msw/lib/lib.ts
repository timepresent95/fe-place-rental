"use server";

import { ApiResult, fetchAction } from "@/api/lib";

//NOTE: msw 실행 환경에 상관 없이 동일한 mock data 보장을 위한 로직
export async function mswAction<T>(
  url: string,
  reqInit?: RequestInit
): Promise<ApiResult<T>> {
  return fetchAction(url, reqInit);
}

"use server";

import { ApiResult } from ".";

//NOTE: node 환경에서 모든 msw를 사용할수 있도록 browser 요청 intercept
export async function mswAction<T>(
  url: string,
  reqInit?: RequestInit
): Promise<ApiResult<T>> {
  const res = await fetch(url, reqInit);

  if (!res.ok) {
    //TODO: 클라이언트 측에서 해결할수 있도록 status를 꾸며서 넘겨주어야 함.
    throw new Error(res.statusText);
  }

  const data: T = await res.json();
  return {
    status: "success",
    data,
  };
}

"use server";

import { revalidateTag } from "next/cache";
import { ApiResult } from ".";
import { CustomErrorResponse } from "./customResponse";

//NOTE: node 환경에서 모든 msw를 사용할수 있도록 browser 요청 intercept
export async function mswAction<T>(
  url: string,
  reqInit?: RequestInit,
  tag?: string
): Promise<ApiResult<T>> {
  const res = await fetch(url, reqInit);

  if (!res.ok) {
    const error: CustomErrorResponse = await res.json();
    return {
      status: "error",
      error,
    };
  }

  const data: T = await res.json();

  if (tag) {
    revalidateTag(tag);
  }

  return {
    status: "success",
    data,
  };
}

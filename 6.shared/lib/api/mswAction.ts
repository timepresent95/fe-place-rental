"use server";

import { ApiResult } from ".";
import { fetchAction } from "./fetchAction";

export async function mswAction<T>(
  url: string,
  reqInit?: RequestInit,
  tag?: string
): Promise<ApiResult<T>> {
  return fetchAction(url, reqInit, tag);
}

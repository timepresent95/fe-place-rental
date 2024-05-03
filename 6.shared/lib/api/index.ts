import { ensureExists } from "@/util/\btypeSafety";

import { CustomErrorResponse } from "./customResponse";
import { fetchAction } from "./fetchAction";
import { mswAction } from "./mswAction";

export interface FormInfo<T extends Record<string, any>> {
  accessKey: Extract<keyof T, string>;
  label: string;
  name: string;
  placeholder?: string;
}

export type ApiResult<T> =
  | {
      status: "success";
      data: T;
    }
  | { status: "error"; error: CustomErrorResponse };

export const baseUrl = ensureExists(
  process.env.NEXT_PUBLIC_API_URL,
  "api base url is not defined"
);

export async function fetchAPI<T>(
  url: string,
  reqInit?: RequestInit,
  tag?: string
): Promise<ApiResult<T>> {
  //NOTE: node 환경에서 모든 msw를 사용할수 있도록 browser 요청 intercept
  if (
    process.env.NEXT_PUBLIC_MOCKING === "true" &&
    typeof window !== "undefined"
  ) {
    return await mswAction(url, reqInit, tag);
  } else {
    return await fetchAction(url, reqInit, tag);
  }
}

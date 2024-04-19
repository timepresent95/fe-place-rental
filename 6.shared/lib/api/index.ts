import { revalidateTag } from "next/cache";
import { assertValue } from "../assertValue";
import { mswAction } from "./mswAction";
import { CustomErrorResponse } from "./customResponse";

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

export const baseUrl = assertValue(
  process.env.NEXT_PUBLIC_API_URL,
  "api base url is not defined"
);

export async function fetchAPI<T>(
  url: string,
  reqInit?: RequestInit,
  tag?: string
): Promise<ApiResult<T>> {
  try {
    if (
      process.env.NEXT_PUBLIC_MOCKING === "true" &&
      typeof window !== "undefined"
    ) {
      return await mswAction(url, reqInit, tag);
    }

    const res = await fetch(url, reqInit);

    if (!res.ok) {
      const error: CustomErrorResponse = await res.json();
      return {
        status: "error",
        error,
      };
    }

    const data: T = await res.json();

    if (typeof window === "undefined" && tag) {
      revalidateTag(tag);
    }

    return {
      status: "success",
      data,
    };
  } catch (error: unknown) {
    //TODO: 여기서 에러가 발생할 경우에 대해 고민해보기
    return {
      status: "error",
      error: {
        isError: true,
        message: "unkown error",
        status: 520,
        detailCode: 52000,
      },
    };
  }
}

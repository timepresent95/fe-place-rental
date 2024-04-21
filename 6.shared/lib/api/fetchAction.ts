"use server";

import { revalidateTag } from "next/cache";
import { CustomErrorResponse } from "./customResponse";
import { cookies } from "next/headers";
import { createSession } from "../session";
import { ApiResult } from ".";

export async function fetchAction<T>(
  url: string,
  reqInit?: RequestInit,
  tag?: string
): Promise<ApiResult<T>> {
  try {
    const sessionCookie = cookies().get("session")?.value;
    if (sessionCookie) {
      if (reqInit?.headers) {
        reqInit = {
          ...reqInit,
          headers: { ...reqInit.headers, "x-auth-token": sessionCookie },
        };
      } else {
        reqInit = {
          ...reqInit,
          headers: { "x-auth-token": sessionCookie },
        };
      }
    }

    const res = await fetch(url, { ...reqInit });

    if (!res.ok) {
      const error: CustomErrorResponse = await res.json();
      return {
        status: "error",
        error,
      };
    }

    const authToken = res.headers.get("x-auth-token");
    if (authToken) {
      createSession(authToken);
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

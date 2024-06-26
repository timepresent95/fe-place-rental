"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { ApiResult } from ".";
import { CustomErrorResponse, customClientErrorCodes } from "./customResponse";
import { createSession } from "../session";

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
    return {
      status: "error",
      error: customClientErrorCodes[40300],
    };
  }
}

import { assertValue } from "./assertValue";

export type ApiResult<T> =
  | {
      status: "success";
      data: T;
    }
  | { status: "error"; message: string };

export const baseUrl = assertValue(
  process.env.NEXT_PUBLIC_API_URL,
  "api base url is not defined"
);

export async function fetchAPI<T>(
  url: string,
  reqInit?: RequestInit,
  handleError?: (error: unknown) => ApiResult<T>
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, reqInit);

    if (!res.ok) {
      //TODO: 서버 에러 관련 로직 추가
      throw new Error(res.statusText);
    }

    const data: T = await res.json();
    return {
      status: "success",
      data,
    };
  } catch (error: unknown) {
    if (handleError) {
      return handleError(error);
    }
    console.error(error);

    //TODO: 서버 에러 관련 로직 추가
    return {
      status: "error",
      message: "server error",
    };
  }
}

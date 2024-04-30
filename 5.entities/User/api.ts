import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";

import {
  GetMyResponse,
  PostLoginRequestBody,
  PostLoginResponse,
  PostSignupRequestBody,
  PostSignupResponse,
} from "./model";

export const apiEndpoint = {
  signup: baseUrl + "/signup",
  login: baseUrl + "/login",
  my: baseUrl + "/my",
};
export const USER_REVALIDTE_TAG = "user";

export async function postSignup(
  body: PostSignupRequestBody
): Promise<ApiResult<PostSignupResponse>> {
  return fetchAPI(apiEndpoint.signup, {
    method: "post",
    body: JSON.stringify(body),
  });
}

export async function postLogin(
  body: PostLoginRequestBody
): Promise<ApiResult<PostLoginResponse>> {
  return fetchAPI(apiEndpoint.login, {
    method: "post",
    body: JSON.stringify(body),
  });
}

export async function getMy(): Promise<ApiResult<GetMyResponse>> {
  return fetchAPI(
    apiEndpoint.my,
    {
      method: "get",
    },
    USER_REVALIDTE_TAG
  );
}

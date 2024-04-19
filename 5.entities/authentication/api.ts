import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import {
  PostLoginRequestBody,
  PostLoginResponse,
  PostSignupRequestBody,
  PostSignupResponse,
} from "./model";

export const apiEndpoint = {
  signup: baseUrl + "/signup",
  login: baseUrl + "/login",
};

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

import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import { PostSignupRequestBody, PostSignupResponse } from "./model";

export const apiEndpoint = {
  signup: baseUrl + "/signup",
};

export async function postSignup(
  body: PostSignupRequestBody
): Promise<ApiResult<PostSignupResponse>> {
  return fetchAPI(apiEndpoint.signup, {
    method: "post",
    body: JSON.stringify(body),
  });
}

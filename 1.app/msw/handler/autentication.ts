import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/authentication/api";
import {
  PostSignupRequestBody,
  PostSignupResponse,
  UserInfo,
} from "@/5.entities/authentication/model";

function createMockUserInfo(payload: PostSignupRequestBody): UserInfo {
  return {
    uid: faker.string.uuid(),
    ...payload,
  };
}

export default ((): HttpHandler[] => {
  const mockUserInfos: { [uid: string]: UserInfo } = {};

  const signupAPI = http.post(apiEndpoint.signup, async ({ request }) => {
    const body = (await request.json()) as PostSignupRequestBody;
    const newUserInfo = createMockUserInfo(body);
    mockUserInfos[newUserInfo.uid] = newUserInfo;
    return HttpResponse.json<PostSignupResponse>(newUserInfo);
  });

  return [signupAPI];
})();

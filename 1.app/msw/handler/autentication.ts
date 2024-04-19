import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/authentication/api";
import {
  PostLoginRequestBody,
  PostLoginResponse,
  PostSignupRequestBody,
  PostSignupResponse,
  UserInfo,
} from "@/5.entities/authentication/model";
import { unauthenticatedResponse } from "./HttpResponseError";

function createMockUserInfo(payload: PostSignupRequestBody): UserInfo {
  return {
    uid: faker.string.uuid(),
    ...payload,
  };
}

export default ((): HttpHandler[] => {
  const mockUserInfos: UserInfo[] = [
    createMockUserInfo({
      id: "test",
      password: "Test1234!",
      firstName: "테스트01",
      familyName: "김",
      email: "test@fakemail.com",
      phone: "010-1234-5678",
    }),
  ];
  const signupAPI = http.post(apiEndpoint.signup, async ({ request }) => {
    const body = (await request.json()) as PostSignupRequestBody;
    const newUserInfo = createMockUserInfo(body);
    mockUserInfos.push(newUserInfo);
    return HttpResponse.json<PostSignupResponse>(newUserInfo);
  });

  const loginAPI = http.post(apiEndpoint.login, async ({ request }) => {
    const body = (await request.json()) as PostLoginRequestBody;
    const targetUser = mockUserInfos.find(
      (v) => v.id === body.id && v.password === body.password
    );

    if (targetUser === undefined) {
      return unauthenticatedResponse;
    }

    return HttpResponse.json<PostLoginResponse>(targetUser);
  });

  return [signupAPI, loginAPI];
})();

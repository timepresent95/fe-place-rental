import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/authentication/api";
import {
  GetMyResponse,
  PostLoginRequestBody,
  PostSignupRequestBody,
  UserInfo,
} from "@/5.entities/authentication/model";
import {
  forbiddenUnAuthenticatedResponse,
  notFoundUserInfoResponse,
  unauthenticatedIdResponse,
  unauthenticatedPasswordResponse,
} from "../lib/DetailErrorResponse";
import { createToken, decrypt } from "../lib/token";

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
      email: "test1@fakemail.com",
      phone: "010-1234-5678",
    }),
    createMockUserInfo({
      id: "t",
      password: "t",
      firstName: "테스트02",
      familyName: "이",
      email: "test2@fakemail.com",
      phone: "010-5678-1234",
    }),
  ];

  //TODO: 중복 아이디 검사 필요
  const signupAPI = http.post(apiEndpoint.signup, async ({ request }) => {
    const body = (await request.json()) as PostSignupRequestBody;

    const newUserInfo = createMockUserInfo(body);
    mockUserInfos.push(newUserInfo);

    const token = await createToken(newUserInfo.uid);

    return new HttpResponse(JSON.stringify(newUserInfo), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
  });

  const loginAPI = http.post(apiEndpoint.login, async ({ request }) => {
    const body = (await request.json()) as PostLoginRequestBody;
    const targetUser = mockUserInfos.find((v) => v.id === body.id);

    if (targetUser === undefined) {
      return unauthenticatedIdResponse();
    }

    if (targetUser.password !== body.password) {
      return unauthenticatedPasswordResponse();
    }

    const token = await createToken(targetUser.uid);

    return new HttpResponse(JSON.stringify(targetUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
  });

  const myInfoAPI = http.get(apiEndpoint.my, async ({ request }) => {
    const token = request.headers.get("x-auth-token");
    const decryptResult = await decrypt(token ?? "");

    if (decryptResult.status === "error") {
      return forbiddenUnAuthenticatedResponse();
    }

    const targetUser = mockUserInfos.find(
      (v) => v.uid === decryptResult.data.uid
    );

    if (targetUser === undefined) {
      return notFoundUserInfoResponse();
    }

    return HttpResponse.json<GetMyResponse>(targetUser);
  });

  return [signupAPI, loginAPI, myInfoAPI];
})();

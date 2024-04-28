import { HttpHandler, HttpResponse, http } from "msw";

import { apiEndpoint } from "@/5.entities/User/api";
import {
  GetMyResponse,
  PostLoginRequestBody,
  PostSignupRequestBody,
} from "@/5.entities/User/model";

import { extractUid } from "./util";
import {
  badRequestWrongTokenResponse,
  forbiddenUnAuthenticatedResponse,
  unauthenticatedIdResponse,
  unauthenticatedPasswordResponse,
} from "../lib/DetailErrorResponse";
import { createMockUserInfo } from "../lib/faker";
import CustomStore from "../lib/store";
import { createToken } from "../lib/token";

export default ((): HttpHandler[] => {
  const store = CustomStore.getInstance();

  //TODO: 중복 아이디 검사 필요
  const signupAPI = http.post(apiEndpoint.signup, async ({ request }) => {
    const body = (await request.json()) as PostSignupRequestBody;

    const newUserInfo = createMockUserInfo(body);
    store.data.user.push(newUserInfo);

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
    const targetUser = store.data.user.find((v) => v.id === body.id);

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

  const myAPI = http.get(apiEndpoint.my, async ({ request }) => {
    const extractResult = await extractUid(request);

    if (extractResult.status === "error") {
      return forbiddenUnAuthenticatedResponse();
    }

    const targetUser = store.data.user.find(
      (v) => v.uid === extractResult.data.uid
    );

    if (targetUser === undefined) {
      return badRequestWrongTokenResponse();
    }

    return HttpResponse.json<GetMyResponse>(targetUser);
  });

  return [signupAPI, loginAPI, myAPI];
})();

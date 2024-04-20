import { HttpResponse } from "msw";

import {
  customClientErrorCodes,
  CustomErrorResponse,
} from "@/6.shared/lib/api/customResponse";

export class DetailErrorResponse extends HttpResponse {
  constructor(errorCodeInfo: CustomErrorResponse) {
    super(JSON.stringify(errorCodeInfo), {
      status: errorCodeInfo.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

//unauthenticated
export const unauthenticatedResponse = new DetailErrorResponse(
  customClientErrorCodes[40100]
);
export const unauthenticatedIdResponse = new DetailErrorResponse(
  customClientErrorCodes[40101]
);
export const unauthenticatedPasswordResponse = new DetailErrorResponse(
  customClientErrorCodes[40102]
);

//forbidden
export const forbiddenResponse = new DetailErrorResponse(
  customClientErrorCodes[40300]
);
export const forbiddenUnAuthenticatedResponse = new DetailErrorResponse(
  customClientErrorCodes[40301]
);
export const forbiddenUnAuthorizedResponse = new DetailErrorResponse(
  customClientErrorCodes[40302]
);

//not found
export const notFoundResponse = new DetailErrorResponse(
  customClientErrorCodes[40400]
);
export const notFoundUserInfoResponse = new DetailErrorResponse(
  customClientErrorCodes[40401]
);

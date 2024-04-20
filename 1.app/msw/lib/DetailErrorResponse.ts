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

export const unauthenticatedResponse = new DetailErrorResponse(
  customClientErrorCodes[40100]
);

export const unauthenticatedIdResponse = new DetailErrorResponse(
  customClientErrorCodes[40101]
);

export const unauthenticatedPasswordResponse = new DetailErrorResponse(
  customClientErrorCodes[40102]
);

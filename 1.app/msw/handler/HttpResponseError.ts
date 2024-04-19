import { type exptectedErrorList } from "@/6.shared/lib/api/Error/NetworkError";
import { HttpResponse, HttpResponseInit } from "msw";

interface HttpResponseErrorInit extends HttpResponseInit {
  status: keyof typeof exptectedErrorList;
}

class HttpResponseError extends HttpResponse {
  constructor(init: HttpResponseErrorInit) {
    super(null, init);
  }
}

export const unauthenticatedResponse = new HttpResponseError({ status: 401 });

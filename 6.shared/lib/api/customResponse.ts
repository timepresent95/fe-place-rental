export interface CustomSucessResponse {
  isError: false;
  status: number;
  detailCode: number;
  name: string;
}

export interface CustomErrorResponse {
  isError: true;
  message: string;
  status: number;
  detailCode: number;
  name: string;
}

type CustomResponse = CustomSucessResponse | CustomErrorResponse;

export const customClientErrorCodes: { [key: number]: CustomErrorResponse } = {
  //bad request
  40000: {
    isError: true,
    name: "Bad Request",
    message: "bad request",
    status: 400,
    detailCode: 40000,
  },
  40001: {
    isError: true,
    name: "Bad Request: Unvalidation Body",
    message: "bad request - unvalidated body",
    status: 400,
    detailCode: 40001,
  },
  40002: {
    isError: true,
    name: "Bad Request: Use Wrong Token",
    message: "bad request - use wrong token",
    status: 400,
    detailCode: 40002,
  },
  //unauthenticated
  40100: {
    isError: true,
    name: "Unauthenticated",
    message: "unauthenticated",
    status: 401,
    detailCode: 40100,
  },
  40101: {
    isError: true,
    name: "Unauthenticated: Id",
    message: "unauthenticated id",
    status: 401,
    detailCode: 40101,
  },
  40102: {
    isError: true,
    name: "Unauthenticated: Password",
    message: "unauthenticated password",
    status: 401,
    detailCode: 40102,
  },
  //forbidden
  40300: {
    isError: true,
    name: "Forbidden",
    message: "forbidden",
    status: 403,
    detailCode: 40300,
  },
  40301: {
    isError: true,
    name: "Forbidden: Unauthenticated",
    message: "forbidden: unauthenticated user",
    status: 403,
    detailCode: 40301,
  },
  40302: {
    isError: true,
    name: "Forbidden: Unauthorized",
    message: "forbidden: unauthorized user",
    status: 403,
    detailCode: 40302,
  },
  //not found
  40400: {
    isError: true,
    name: "Not Found",
    message: "not found",
    status: 404,
    detailCode: 40400,
  },
  40401: {
    isError: true,
    name: "Not Found User",
    message: "not found: can not find user info",
    status: 404,
    detailCode: 40401,
  },
};

export const customStatusCodes: { [key: number]: CustomResponse } = {
  ...customClientErrorCodes,
};

export interface CustomSucessResponse {
  isError: false;
  status: number;
  detailCode: number;
}

export interface CustomErrorResponse {
  isError: true;
  message: string;
  status: number;
  detailCode: number;
}

type CustomResponse = CustomSucessResponse | CustomErrorResponse;

export const customClientErrorCodes: { [key: number]: CustomErrorResponse } = {
  //bad request
  40000: {
    isError: true,
    message: "bad request",
    status: 400,
    detailCode: 40000,
  },
  40001: {
    isError: true,
    message: "bad request - unvalidated body",
    status: 400,
    detailCode: 40001,
  },
  //unauthenticated
  40100: {
    isError: true,
    message: "unauthenticated",
    status: 401,
    detailCode: 40100,
  },
  40101: {
    isError: true,
    message: "unauthenticated id",
    status: 401,
    detailCode: 40101,
  },
  40102: {
    isError: true,
    message: "unauthenticated password",
    status: 401,
    detailCode: 40102,
  },
  //forbidden
  40300: {
    isError: true,
    message: "forbidden",
    status: 403,
    detailCode: 40300,
  },
  40301: {
    isError: true,
    message: "forbidden: unauthenticated user",
    status: 403,
    detailCode: 40301,
  },
  40302: {
    isError: true,
    message: "forbidden: unauthorized user",
    status: 403,
    detailCode: 40302,
  },
  //not found
  40400: {
    isError: true,
    message: "not found",
    status: 404,
    detailCode: 40400,
  },
  40401: {
    isError: true,
    message: "not found: can not find user info",
    status: 404,
    detailCode: 40401,
  },
};

export const customStatusCodes: { [key: number]: CustomResponse } = {
  ...customClientErrorCodes,
};

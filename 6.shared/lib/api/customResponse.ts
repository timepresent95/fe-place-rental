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
};

export const customStatusCodes: { [key: number]: CustomResponse } = {
  ...customClientErrorCodes,
};

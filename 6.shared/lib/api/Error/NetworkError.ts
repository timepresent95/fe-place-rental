export class NetworkError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const exptectedErrorList = {
  401: new NetworkError("unauthenticated", 401),
} as const;

export function createNetworkError(statusCode: number) {
  if (
    Object.keys(exptectedErrorList).find((v) => v === statusCode.toString())
  ) {
    return exptectedErrorList[statusCode as keyof typeof exptectedErrorList];
  }

  throw new Error("unkown Error");
}

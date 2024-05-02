class MockError extends Error {
  statusCode: number;

  constructor(statusCode: number, errorType: string, description: string) {
    super(`${errorType}:: ${description}`);
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends MockError {
  constructor(description: string = "") {
    super(401, "Unauthorized Error", description);
  }
}

export class NotFoundError extends MockError {
  constructor(description: string = "") {
    super(404, "Not Found Error", description);
  }
}

export class ConfictError extends MockError {
  constructor(description: string = "") {
    super(409, "Conflict Error", description);
  }
}

export class InternalServerError extends MockError {
  constructor(description: string = "") {
    super(500, "Internal Server Error", description);
  }
}

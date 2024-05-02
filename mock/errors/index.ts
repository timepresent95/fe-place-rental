class MockError extends Error {
  statusCode: number;

  constructor(statusCode: number, errorType: string, description: string) {
    super(`${errorType}:: ${description}`);
    this.statusCode = statusCode;
  }
}

export class ConfictError extends MockError {
  constructor(description: string = "") {
    super(409, "Conflict Error", description);
  }
}

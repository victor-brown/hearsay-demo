type ErrorType = "BadRequestError" | "InternalServerError";

interface ErrorOptions {
  message?: string;
  code?: string;
}

class AppError {
  code: string;
  message: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, "BAD_REQUEST_ERROR");
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, "INTERNAL_SERVER_ERROR");
  }
}

function createError(type: ErrorType, options: ErrorOptions = {}): AppError {
  const { message } = options;

  switch (type) {
    case "BadRequestError":
      return new BadRequestError(message);
    case "InternalServerError":
      return new InternalServerError(message);
    default:
      return new InternalServerError("Unknown error");
  }
}

export { createError, AppError, BadRequestError, InternalServerError };

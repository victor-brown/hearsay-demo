import { type NextFunction, type Request, type Response } from "express";
import {
  type AppError,
  createError,
  BadRequestError,
} from "../factories/ErrorFactory";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = 500;
  let error: AppError;

  if (err instanceof BadRequestError) {
    statusCode = 400;
    error = createError("BadRequestError", {
      message: err.message,
      code: err.code,
    });
  } else {
    error = createError("InternalServerError", {
      message: err.message || "An unknown error occurred",
      code: "UNKNOWN_ERROR",
    });
  }

  res.status(statusCode).json({ error });
}

export { errorHandler };

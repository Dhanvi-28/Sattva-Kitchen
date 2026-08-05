import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { sendError } from "../utils/responseHandler.js";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error processing ${req.method} ${req.originalUrl}:`, err);

  const statusCode = err instanceof ApiError ? err.statusCode : err.status || 500;
  const message = err.message || "Internal Server Error";
  const errorDetails = env.isProd ? {} : { stack: err.stack, details: err.errors || [] };

  return sendError(res, message, errorDetails, statusCode);
};

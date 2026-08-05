import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Operation successful",
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message = "Operation failed",
  error: any = {},
  statusCode = 500
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    error: typeof error === "string" ? { message: error } : error,
  };
  return res.status(statusCode).json(response);
};

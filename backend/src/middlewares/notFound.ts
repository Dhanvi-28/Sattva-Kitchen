import { Request, Response } from "express";
import { sendError } from "../utils/responseHandler.js";

export const notFound = (req: Request, res: Response) => {
  return sendError(res, `Resource not found - ${req.originalUrl}`, {}, 404);
};

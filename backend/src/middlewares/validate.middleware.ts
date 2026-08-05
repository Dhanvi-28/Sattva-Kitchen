import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { sendError } from "../utils/responseHandler.js";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return sendError(res, "Validation Error", { details: issueDetails }, 400);
      }
      return sendError(res, "Invalid request format", {}, 400);
    }
  };
};

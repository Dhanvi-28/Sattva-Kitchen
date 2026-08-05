import { Request, Response, NextFunction } from "express";
import { Tag } from "../models/tag.model.ts";
import { sendSuccess } from "../utils/responseHandler.js";

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.find({}).lean();
    return sendSuccess(res, tags, "Tags retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

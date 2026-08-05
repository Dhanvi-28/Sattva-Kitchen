import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category.model.ts";
import { sendSuccess } from "../utils/responseHandler.js";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    return sendSuccess(res, categories, "Categories retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

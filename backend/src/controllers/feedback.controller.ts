import { Request, Response, NextFunction } from "express";
import { Feedback } from "../models/feedback.model.ts";
import { sendSuccess } from "../utils/responseHandler.js";

export const submitFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipeId, rating, comment, userEmail } = req.body;
    const feedback = await Feedback.create({ recipeId, rating, comment, userEmail });
    return sendSuccess(res, feedback, "Thank you for your feedback!", 201);
  } catch (error) {
    return next(error);
  }
};

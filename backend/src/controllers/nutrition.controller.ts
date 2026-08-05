import { Request, Response, NextFunction } from "express";
import { LLMFactory } from "../ai/llmFactory.js";
import { sendSuccess } from "../utils/responseHandler.js";

export const analyzeNutrition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ingredients } = req.body;
    const provider = LLMFactory.getProvider();
    const result = await provider.analyzeNutrition(ingredients);
    return sendSuccess(res, result, "Nutrition analyzed successfully");
  } catch (error) {
    return next(error);
  }
};

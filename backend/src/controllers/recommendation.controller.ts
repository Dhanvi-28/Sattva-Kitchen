import { Request, Response, NextFunction } from "express";
import { RecommendationService } from "../ai/recommendation.service.js";
import { sendSuccess } from "../utils/responseHandler.js";

export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { answers } = req.body;
    const recommendations = await RecommendationService.getRecommendations(answers);
    return sendSuccess(res, recommendations, "Personalized recipe recommendations generated");
  } catch (error) {
    return next(error);
  }
};

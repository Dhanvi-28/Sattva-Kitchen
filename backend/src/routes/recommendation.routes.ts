import { Router } from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { recommendationSchema } from "../validators/quiz.validator.js";

const router = Router();
router.post("/", validate(recommendationSchema), getRecommendations);
export default router;

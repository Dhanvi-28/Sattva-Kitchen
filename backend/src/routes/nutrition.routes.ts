import { Router } from "express";
import { analyzeNutrition } from "../controllers/nutrition.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { analyzeNutritionSchema } from "../validators/nutrition.validator.js";

const router = Router();
router.post("/analyze", validate(analyzeNutritionSchema), analyzeNutrition);
export default router;

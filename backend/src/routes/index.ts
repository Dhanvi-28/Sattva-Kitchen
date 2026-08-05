import { Router } from "express";
import healthRoutes from "./health.routes.js";
import recipeRoutes from "./recipe.routes.js";
import categoryRoutes from "./category.routes.js";
import tagRoutes from "./tag.routes.js";
import conditionRoutes from "./condition.routes.js";
import nutritionRoutes from "./nutrition.routes.js";
import recommendationRoutes from "./recommendation.routes.js";
import feedbackRoutes from "./feedback.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/recipes", recipeRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/conditions", conditionRoutes);
router.use("/nutrition", nutritionRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/feedback", feedbackRoutes);

export default router;

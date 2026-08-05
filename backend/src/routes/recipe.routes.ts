import { Router } from "express";
import {
  getRecipes,
  getRecipeById,
  searchRecipes,
  generateRecipe,
} from "../controllers/recipe.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  getRecipeByIdSchema,
  generateRecipeSchema,
  searchRecipeSchema,
} from "../validators/recipe.validator.js";

const router = Router();

router.get("/", getRecipes);
router.get("/search", validate(searchRecipeSchema), searchRecipes);
router.get("/:id", validate(getRecipeByIdSchema), getRecipeById);
router.post("/generate", validate(generateRecipeSchema), generateRecipe);

export default router;

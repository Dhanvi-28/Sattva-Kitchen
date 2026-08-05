import { Request, Response, NextFunction } from "express";
import { Recipe } from "../models/recipe.model.ts";
import { RecipeGenerationService } from "../ai/recipeGeneration.service.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";
import { SearchHistory } from "../models/searchHistory.model.ts";

export const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sort, limit = "12" } = req.query;
    const queryLimit = parseInt(limit as string, 10);

    let query = Recipe.find({});

    if (sort === "popular") {
      query = query.find({ isPopular: true });
    } else if (sort === "recent") {
      query = query.sort({ createdAt: -1 });
    }

    const recipes = await query.limit(queryLimit).lean();
    return sendSuccess(res, recipes, "Recipes retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

export const getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Find by _id or slug
    const recipe = await Recipe.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
    }).lean();

    if (!recipe) {
      return sendError(res, `Recipe with ID or slug "${id}" not found`, {}, 404);
    }

    return sendSuccess(res, recipe, "Recipe details retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

export const searchRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      q,
      category,
      mealType,
      diet,
      dosha,
      tcm,
      difficulty,
      maxTime,
      maxCalories,
      minProtein,
      sort,
      page = "1",
      limit = "12",
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const filterQuery: any = {};

    if (q) {
      filterQuery.$text = { $search: q as string };
    }
    if (category) {
      filterQuery.dietaryTags = { $in: [new RegExp(category as string, "i")] };
    }
    if (mealType) {
      filterQuery.mealType = new RegExp(mealType as string, "i");
    }
    if (diet) {
      filterQuery.dietaryTags = { $in: [new RegExp(diet as string, "i")] };
    }
    if (dosha) {
      filterQuery["ayurvedaBenefits.doshaImpact"] = new RegExp(dosha as string, "i");
    }
    if (tcm) {
      filterQuery["tcmBenefits.thermalNature"] = new RegExp(tcm as string, "i");
    }
    if (difficulty) {
      filterQuery.difficulty = difficulty;
    }
    if (maxTime) {
      filterQuery.cookTime = { $lte: parseInt(maxTime as string, 10) };
    }
    if (maxCalories) {
      filterQuery.calories = { $lte: parseInt(maxCalories as string, 10) };
    }
    if (minProtein) {
      filterQuery.protein = { $gte: parseInt(minProtein as string, 10) };
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === "popular") sortOptions = { isPopular: -1, createdAt: -1 };
    if (sort === "time") sortOptions = { prepTime: 1, cookTime: 1 };
    if (sort === "calories") sortOptions = { calories: 1 };

    const [recipes, total] = await Promise.all([
      Recipe.find(filterQuery).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Recipe.countDocuments(filterQuery),
    ]);

    // Record search analytics asynchronously
    if (q) {
      SearchHistory.create({ query: q as string, filters: req.query, resultCount: total }).catch(() => {});
    }

    return sendSuccess(
      res,
      {
        recipes,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
      "Recipe search results"
    );
  } catch (error) {
    return next(error);
  }
};

export const generateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, dosha, tcmNature } = req.body;
    const generated = await RecipeGenerationService.generateRecipe(topic, dosha, tcmNature);
    return sendSuccess(res, generated, "AI Recipe generated successfully");
  } catch (error) {
    return next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { WellnessCondition } from "../models/wellnessCondition.model.ts";
import { sendSuccess } from "../utils/responseHandler.js";

export const getConditions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditions = await WellnessCondition.find({}).lean();
    return sendSuccess(res, conditions, "Wellness conditions retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

export const getQuizQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = [
      {
        id: "dosha",
        prompt: "What best describes your mind-body constitution (Ayurvedic Dosha)?",
        helperText: "Choose the primary state you feel currently.",
        multiSelect: false,
        options: [
          { id: "vata", label: "Vata — Creative, quick, tend to feel cold/dry", icon: "💨" },
          { id: "pitta", label: "Pitta — Driven, warm-bodied, strong digestion", icon: "🔥" },
          { id: "kapha", label: "Kapha — Calm, grounded, tend to feel heavy", icon: "🌱" },
          { id: "tridoshic", label: "Tridoshic — Balanced or unsure", icon: "⚖️" },
        ],
      },
      {
        id: "tcmThermal",
        prompt: "What thermal energy does your body crave?",
        helperText: "TCM balances internal heat and coldness.",
        multiSelect: false,
        options: [
          { id: "warming", label: "Warming — Invigorate digestion & metabolic heat", icon: "☀️" },
          { id: "cooling", label: "Cooling — Clear heat & soothe internal restlessness", icon: "🌧️" },
          { id: "neutral", label: "Neutral — Gentle maintenance & grounding", icon: "🍃" },
        ],
      },
      {
        id: "diet",
        prompt: "Any dietary preferences or restrictions?",
        helperText: "Select all that apply to your current lifestyle.",
        multiSelect: true,
        options: [
          { id: "vegan", label: "Vegan", icon: "🌱" },
          { id: "vegetarian", label: "Vegetarian", icon: "🥑" },
          { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
          { id: "dairy-free", label: "Dairy-Free", icon: "🥛" },
          { id: "high-protein", label: "High-Protein", icon: "💪" },
        ],
      },
      {
        id: "goal",
        prompt: "What is your primary wellness goal today?",
        helperText: "We will prioritize recipes aligned with this intent.",
        multiSelect: false,
        options: [
          { id: "digestion", label: "Ease Digestion & Bloating", icon: "🍵" },
          { id: "energy", label: "Boost Energy & Vitality", icon: "⚡" },
          { id: "calm", label: "Soothe Mind & Sleep Better", icon: "🌙" },
          { id: "immunity", label: "Strengthen Immunity & Qi", icon: "🛡️" },
        ],
      },
    ];

    return sendSuccess(res, questions, "Quiz questions fetched successfully");
  } catch (error) {
    return next(error);
  }
};

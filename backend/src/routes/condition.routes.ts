import { Router } from "express";
import { getConditions, getQuizQuestions } from "../controllers/condition.controller.js";

const router = Router();
router.get("/", getConditions);
router.get("/quiz", getQuizQuestions);
export default router;

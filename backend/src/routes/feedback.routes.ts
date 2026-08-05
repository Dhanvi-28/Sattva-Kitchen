import { Router } from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { feedbackSchema } from "../validators/feedback.validator.js";

const router = Router();
router.post("/", validate(feedbackSchema), submitFeedback);
export default router;

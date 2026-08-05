import { Router } from "express";

const router = Router();

/**
 * Central route registry. Feature routers get mounted here, e.g.:
 *
 *   import userRoutes from "./user.routes.js";
 *   router.use("/users", userRoutes);
 *
 * Intentionally empty — no feature/page routes are implemented yet.
 */

router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is healthy", timestamp: new Date().toISOString() });
});

export default router;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";

import { env } from "./config/env.js";
import { swaggerSpec } from "./config/swagger.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

// Security and compression middlewares
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging
app.use(morgan(env.isProd ? "combined" : "dev"));

// Global rate limiting for API routes
app.use("/api", apiLimiter);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API v1 routes
app.use("/api/v1", routes);

// 404 & Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;

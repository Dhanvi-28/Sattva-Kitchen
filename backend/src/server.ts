import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.port, () => {
    logger.info(`Sattva Kitchen Backend running on port ${env.port} (${env.nodeEnv})`);
    logger.info(`Swagger Documentation available at http://localhost:${env.port}/api-docs`);
  });

  const handleShutdown = (signal: string) => {
    logger.info(`${signal} received. Initiating graceful shutdown...`);
    server.close(() => {
      logger.info("HTTP Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
};

startServer();

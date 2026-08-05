import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

mongoose.set("strictQuery", true);

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    logger.info(`MongoDB Atlas connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB connection lost");
    });

    return conn;
  } catch (err: any) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    if (env.isProd) {
      process.exit(1);
    }
    logger.warn("Continuing server startup in graceful degraded mode...");
    return mongoose;
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close();
};

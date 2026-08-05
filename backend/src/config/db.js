import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

mongoose.set("strictQuery", true);

/**
 * Connects to MongoDB Atlas using the URI from environment config.
 * Retries are left to the platform/process manager; this simply
 * fails fast and logs clearly so startup issues are obvious.
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri, {
      // Sensible Atlas defaults; mongoose 8 handles most of this
      // automatically, but being explicit documents intent.
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    logger.info(`MongoDB Atlas connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    return conn;
  } catch (err) {
    logger.error(`MongoDB Atlas connection failed: ${err.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};

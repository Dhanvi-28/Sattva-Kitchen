import { Request, Response } from "express";
import mongoose from "mongoose";
import { sendSuccess } from "../utils/responseHandler.js";

export const getHealthStatus = (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const states = ["disconnected", "connected", "connecting", "disconnecting"];

  const healthData = {
    status: "UP",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: states[dbState] || "unknown",
      isConnected: dbState === 1,
    },
    environment: process.env.NODE_ENV || "development",
  };

  return sendSuccess(res, healthData, "Sattva Kitchen API is healthy");
};

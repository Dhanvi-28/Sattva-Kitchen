import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sattva Kitchen API",
      version: "1.0.0",
      description:
        "Production-ready AI-powered wellness recipe platform API based on Ayurveda and Traditional Chinese Medicine (TCM).",
      contact: {
        name: "Sattva Kitchen Engineering",
        email: "support@sattvakitchen.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}/api/v1`,
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);

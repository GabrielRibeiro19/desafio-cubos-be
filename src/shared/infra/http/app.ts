import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import "@shared/container/providers";

import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();

process.env.TZ = "America/Sao_Paulo";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/movies", express.static(`${upload.tmpFolder}/movies`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };

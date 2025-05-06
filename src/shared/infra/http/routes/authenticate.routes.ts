import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { authRateLimiter } from "../middlewares/authRateLimiter";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post(
  "/sessions",
  authRateLimiter,
  authenticateUserController.handle
);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };

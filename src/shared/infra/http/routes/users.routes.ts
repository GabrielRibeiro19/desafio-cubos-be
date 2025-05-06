import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserContoller";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/me", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };

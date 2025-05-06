import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { genresRoutes } from "./genres.routes";
import { moviesRoutes } from "./movies.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/genres", genresRoutes);
router.use("/movies", moviesRoutes);
router.use(authenticateRoutes);

export { router };

import { Router } from "express";

import { CreateGenreController } from "@modules/genres/useCases/createGenre/CreateGenreController";
import { DeleteGenreController } from "@modules/genres/useCases/deleteGenre/DeleteGenreController";
import { ListGenresController } from "@modules/genres/useCases/listGenres/ListGenresController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const genresRoutes = Router();

const createGenreController = new CreateGenreController();
const listGenresController = new ListGenresController();
const deleteGenreController = new DeleteGenreController();

genresRoutes.post("/", ensureAuthenticated, createGenreController.handle);
genresRoutes.get("/", ensureAuthenticated, listGenresController.handle);
genresRoutes.delete("/:id", ensureAuthenticated, deleteGenreController.handle);

export { genresRoutes };

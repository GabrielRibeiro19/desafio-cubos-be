import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateMovieController } from "@modules/movies/useCases/createMovie/CreateMovieController";
import { DeleteMovieController } from "@modules/movies/useCases/deleteMovie/DeleteMovieController";
import { GetMovieController } from "@modules/movies/useCases/getMovie/GetMovieController";
import { ListMoviesController } from "@modules/movies/useCases/listMovies/ListMoviesController";
import { UpdateMovieController } from "@modules/movies/useCases/updateMovie/UpdateMovieController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const moviesRoutes = Router();
const upload = multer(uploadConfig);

const createMovieController = new CreateMovieController();
const updateMovieController = new UpdateMovieController();
const listMoviesController = new ListMoviesController();
const getMovieController = new GetMovieController();
const deleteMovieController = new DeleteMovieController();

moviesRoutes.post(
  "/",
  ensureAuthenticated,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image_secondary", maxCount: 1 },
  ]),
  createMovieController.handle
);

moviesRoutes.put(
  "/:id",
  ensureAuthenticated,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image_secondary", maxCount: 1 },
  ]),
  updateMovieController.handle
);

moviesRoutes.get("/", ensureAuthenticated, listMoviesController.handle);

moviesRoutes.get("/:id", ensureAuthenticated, getMovieController.handle);

moviesRoutes.delete("/:id", ensureAuthenticated, deleteMovieController.handle);

export { moviesRoutes };

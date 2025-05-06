import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { GenresMoviesRepository } from "@modules/genres/infra/typeorm/repositories/GenresMoviesRepository";
import { GenresRepository } from "@modules/genres/infra/typeorm/repositories/GenresRepository";
import { IGenresMoviesRepository } from "@modules/genres/repositories/IGenresMoviesRepository";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";
import { MoviesRepository } from "@modules/movies/infra/typeorm/repositories/MoviesRepository";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IMoviesRepository>(
  "MoviesRepository",
  MoviesRepository
);

container.registerSingleton<IGenresMoviesRepository>(
  "GenresMoviesRepository",
  GenresMoviesRepository
);

container.registerSingleton<IGenresRepository>(
  "GenresRepository",
  GenresRepository
);

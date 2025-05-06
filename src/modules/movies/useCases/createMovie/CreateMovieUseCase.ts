import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IGenresMoviesRepository } from "@modules/genres/repositories/IGenresMoviesRepository";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";
import { ICreateMovieDTO } from "@modules/movies/dtos/ICreateMovieDTO";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateMovieUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("GenresMoviesRepository")
    private genresMoviesRepository: IGenresMoviesRepository,
    @inject("GenresRepository")
    private genresRepository: IGenresRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({
    id,
    user_id,
    title,
    overview,
    original_title,
    trailer_url,
    popularity,
    genre_ids,
    votes,
    rating,
    release_date,
    status,
    language,
    tagline,
    budget,
    revenue,
    profit,
    duration,
    image,
    image_secondary,
  }: ICreateMovieDTO) {
    let genreIds = genre_ids;

    // converter genre_ids para string[] pois ele pode vir um array de strings ou apenas uma string fora do array
    if (typeof genre_ids === "string") {
      genreIds = [genre_ids];
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não existe");
    }

    if (!genre_ids || !genre_ids.length) {
      throw new AppError("Gênero é obrigatório");
    }

    const genres = await this.genresRepository.findByIds(genreIds);

    if (genres.length !== genreIds.length) {
      throw new AppError("Gênero não existe");
    }

    const movieAlreadExists = await this.moviesRepository.findByTitle(
      title,
      user_id
    );

    if (movieAlreadExists) {
      if (image) {
        await this.storageProvider.delete(image, "");
      }

      if (image_secondary) {
        await this.storageProvider.delete(image_secondary, "");
      }

      throw new AppError("Filme já cadastrado!");
    }

    if (!title) {
      throw new AppError("Título é obrigatório");
    }

    if (!image) {
      throw new AppError("Imagem é obrigatória");
    }

    if (
      !overview ||
      !original_title ||
      !trailer_url ||
      !popularity ||
      !votes ||
      !rating ||
      !release_date ||
      !status ||
      !language ||
      !budget ||
      !revenue ||
      !profit ||
      !duration
    ) {
      throw new AppError("Dados obrigatórios não informados");
    }

    const movie = await this.moviesRepository.create({
      id,
      user_id,
      overview,
      title,
      original_title,
      trailer_url,
      popularity,
      votes,
      rating,
      release_date,
      status,
      language,
      budget,
      revenue,
      profit,
      tagline,
      duration,
      image: image ? await this.storageProvider.save(image, "movies") : null,
      image_secondary: image_secondary
        ? await this.storageProvider.save(image_secondary, "movies")
        : null,
    });

    const genrePromises = genreIds.map((genre_id) => {
      return this.genresMoviesRepository.create({
        genre_id,
        movie_id: movie.id,
        user_id,
      });
    });

    await Promise.all(genrePromises);

    return movie;
  }
}

export { CreateMovieUseCase };

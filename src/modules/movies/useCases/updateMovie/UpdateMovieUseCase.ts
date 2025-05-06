import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IGenresMoviesRepository } from "@modules/genres/repositories/IGenresMoviesRepository";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";
import { IUpdateMovieDTO } from "@modules/movies/dtos/IUpdateMovieDTO";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateMovieUseCase {
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
    original_title,
    trailer_url,
    overview,
    popularity,
    tagline,
    genre_ids,
    votes,
    rating,
    release_date,
    status,
    language,
    budget,
    revenue,
    profit,
    duration,
    image,
    image_secondary,
  }: IUpdateMovieDTO): Promise<IUpdateMovieDTO> {
    let genreIds = genre_ids;

    // converter genre_ids para string[] pois ele pode vir um array de strings ou apenas uma string fora do array
    if (typeof genre_ids === "string") {
      genreIds = [genre_ids];
    }

    const movieExists = await this.moviesRepository.findById(id);

    if (!movieExists) {
      throw new AppError("Filme não existe");
    }

    if (movieExists.user_id !== user_id) {
      throw new AppError("Você não tem permissão para editar este filme");
    }

    if (title && title !== movieExists.title) {
      const movieAlreadyExists = await this.moviesRepository.findByTitle(
        title,
        user_id
      );

      if (movieAlreadyExists && movieAlreadyExists.id !== id) {
        throw new AppError("Já existe um filme com este título");
      }
    }

    if (genre_ids && genre_ids.length > 0) {
      const genres = await this.genresRepository.findByIds(genreIds);

      if (genres.length !== genreIds.length) {
        throw new AppError("Algum dos gêneros informados não existe");
      }

      await this.genresMoviesRepository.deleteByMovieId(id);

      const genrePromises = genreIds.map((genre_id) => {
        return this.genresMoviesRepository.create({
          genre_id,
          movie_id: id,
          user_id,
        });
      });

      await Promise.all(genrePromises);
    }

    let newImage = movieExists.image;
    if (image) {
      if (movieExists.image) {
        await this.storageProvider.delete(movieExists.image, "movies");
      }
      newImage = await this.storageProvider.save(image, "movies");
    }

    let newImageSecondary = movieExists.image_secondary;
    if (image_secondary) {
      if (movieExists.image_secondary) {
        await this.storageProvider.delete(
          movieExists.image_secondary,
          "movies"
        );
      }
      newImageSecondary = await this.storageProvider.save(
        image_secondary,
        "movies"
      );
    }

    const updatedMovie = await this.moviesRepository.update({
      id,
      user_id,
      title,
      original_title,
      trailer_url,
      popularity,
      tagline,
      votes,
      rating,
      overview,
      release_date,
      status,
      language,
      budget,
      revenue,
      profit,
      duration,
      image: newImage,
      image_secondary: newImageSecondary,
    });

    return updatedMovie;
  }
}

export { UpdateMovieUseCase };

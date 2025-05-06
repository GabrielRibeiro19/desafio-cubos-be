import { getRepository, Repository } from "typeorm";

import { ICreateGenreMovieDTO } from "@modules/genres/dtos/ICreateGenreMovieDTO";
import { IGenresMoviesRepository } from "@modules/genres/repositories/IGenresMoviesRepository";

import { GenreMovie } from "../entities/GenreMovie";

class GenresMoviesRepository implements IGenresMoviesRepository {
  private repository: Repository<GenreMovie>;

  constructor() {
    this.repository = getRepository(GenreMovie);
  }

  async create({
    id,
    genre_id,
    movie_id,
    user_id,
  }: ICreateGenreMovieDTO): Promise<GenreMovie> {
    const genreMovie = this.repository.create({
      id,
      genre_id,
      movie_id,
      user_id,
    });

    await this.repository.save(genreMovie);

    return genreMovie;
  }

  async deleteByMovieId(movie_id: string): Promise<void> {
    await this.repository.delete({ movie_id });
  }
}

export { GenresMoviesRepository };

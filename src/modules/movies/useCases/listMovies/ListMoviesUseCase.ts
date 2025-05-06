import { inject, injectable } from "tsyringe";

import { IListMoviesOptions } from "@modules/movies/dtos/IListMoviesOptions";
import { IResponseListMoviesDTO } from "@modules/movies/dtos/IResponseListMoviesDTO";
import { MovieMap } from "@modules/movies/mapper/MovieMap";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";

@injectable()
class ListMoviesUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) {}
  async execute({
    page,
    per_page,
    user_id,
    query,
    duration_range,
    genre_ids,
    release_date,
  }: IListMoviesOptions): Promise<IResponseListMoviesDTO> {
    const movies = await this.moviesRepository.list({
      user_id,
      page: Math.abs(page),
      per_page: Math.abs(per_page),
      query,
      duration_range,
      genre_ids,
      release_date,
    });

    return {
      ...movies,
      data: movies.data.map((movie) => MovieMap.toDTO(movie)),
    };
  }
}

export { ListMoviesUseCase };

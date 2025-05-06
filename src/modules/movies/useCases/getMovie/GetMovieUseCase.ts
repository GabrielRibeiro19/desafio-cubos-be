import { inject, injectable } from "tsyringe";

import { IResponseMovieDTO } from "@modules/movies/dtos/IResponseMovieDTO";
import { MovieMap } from "@modules/movies/mapper/MovieMap";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class GetMovieUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) {}
  async execute(id: string, user_id: string): Promise<IResponseMovieDTO> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new AppError("Filme não existe");
    }

    if (movie.user_id !== user_id) {
      throw new AppError("Você não tem permissão para visualizar este filme");
    }

    return MovieMap.toDTO(movie);
  }
}

export { GetMovieUseCase };

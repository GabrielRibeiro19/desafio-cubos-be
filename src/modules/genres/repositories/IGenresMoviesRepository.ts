import { ICreateGenreMovieDTO } from "../dtos/ICreateGenreMovieDTO";
import { GenreMovie } from "../infra/typeorm/entities/GenreMovie";

interface IGenresMoviesRepository {
  create(data: ICreateGenreMovieDTO): Promise<GenreMovie>;
  deleteByMovieId(movie_id: string): Promise<void>;
}

export { IGenresMoviesRepository };

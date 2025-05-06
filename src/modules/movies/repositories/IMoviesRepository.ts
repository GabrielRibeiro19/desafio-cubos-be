import { ICreateMovieDTO } from "../dtos/ICreateMovieDTO";
import { IListMoviesOptions } from "../dtos/IListMoviesOptions";
import { IResponseListMoviesDTO } from "../dtos/IResponseListMoviesDTO";
import { IUpdateMovieDTO } from "../dtos/IUpdateMovieDTO";
import { Movie } from "../infra/typeorm/entities/Movie";

interface IMoviesRepository {
  create(data: ICreateMovieDTO): Promise<Movie>;
  update(data: IUpdateMovieDTO): Promise<Movie>;
  list(options: IListMoviesOptions): Promise<IResponseListMoviesDTO>;
  findById(id: string): Promise<Movie>;
  findByTitle(title: string, user_id: string): Promise<Movie>;
  deleteById(id: string): Promise<void>;
}

export { IMoviesRepository };

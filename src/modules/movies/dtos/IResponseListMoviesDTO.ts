import { IResponseMovieDTO } from "./IResponseMovieDTO";

interface IResponseListMoviesDTO {
  data: IResponseMovieDTO[];
  page: number;
  total: number;
  last_page: number;
}

export { IResponseListMoviesDTO };

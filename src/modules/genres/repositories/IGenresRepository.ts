import { ICreateGenreDTO } from "../dtos/ICreateGenreDTO";
import { Genre } from "../infra/typeorm/entities/Genre";

interface IGenresRepository {
  create(data: ICreateGenreDTO): Promise<Genre>;
  findByTitleAndUser(title: string, user_id: string): Promise<Genre>;
  listByUser(user_id: string): Promise<Genre[]>;
  findById(id: string): Promise<Genre>;
  findByIds(genre_ids: string[]): Promise<Genre[]>;
  delete(): Promise<void>;
}

export { IGenresRepository };

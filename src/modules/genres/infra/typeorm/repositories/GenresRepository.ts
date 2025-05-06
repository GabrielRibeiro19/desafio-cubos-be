import { getRepository, In, Repository } from "typeorm";

import { ICreateGenreDTO } from "@modules/genres/dtos/ICreateGenreDTO";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";

import { Genre } from "../entities/Genre";

class GenresRepository implements IGenresRepository {
  private repository: Repository<Genre>;

  constructor() {
    this.repository = getRepository(Genre);
  }

  async create({ id, title, user_id }: ICreateGenreDTO): Promise<Genre> {
    const genre = this.repository.create({
      id,
      title,
      user_id,
    });

    await this.repository.save(genre);

    return genre;
  }

  async listByUser(user_id: string): Promise<Genre[]> {
    const genres = await this.repository.find({
      where: { user_id },
    });

    return genres;
  }

  async findByTitleAndUser(title: string, user_id: string): Promise<Genre> {
    const genre = await this.repository.findOne({
      where: { title, user_id },
    });

    return genre;
  }

  async findById(id: string): Promise<Genre> {
    const genre = await this.repository.findOne({ where: { id } });

    return genre;
  }

  async delete(): Promise<void> {
    const gende = await this.repository.findOne();
    await this.repository.delete(gende.id);
  }

  async findByIds(genre_ids: string[]): Promise<Genre[]> {
    const genres = await this.repository.find({
      where: {
        id: In(genre_ids),
      },
    });

    return genres;
  }
}

export { GenresRepository };

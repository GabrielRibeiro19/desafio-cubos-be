import { inject, injectable } from "tsyringe";

import { Genre } from "@modules/genres/infra/typeorm/entities/Genre";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";

@injectable()
class ListGenresUseCase {
  constructor(
    @inject("GenresRepository")
    private genresRepository: IGenresRepository
  ) {}
  async execute(user_id: string): Promise<Genre[]> {
    const genres = await this.genresRepository.listByUser(user_id);

    return genres;
  }
}

export { ListGenresUseCase };

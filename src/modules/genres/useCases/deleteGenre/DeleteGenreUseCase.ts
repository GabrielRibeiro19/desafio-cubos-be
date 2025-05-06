import { inject, injectable } from "tsyringe";

import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteGenreUseCase {
  constructor(
    @inject("GenresRepository")
    private genresRepository: IGenresRepository
  ) {}

  async execute(genre_id: string, user_id: string): Promise<void> {
    const genreExists = await this.genresRepository.findById(genre_id);

    if (!genreExists) {
      throw new AppError("Gênero não existe");
    }

    if (genreExists.user_id !== user_id) {
      throw new AppError("Gênero não pertence ao usuário");
    }

    await this.genresRepository.delete();
  }
}

export { DeleteGenreUseCase };

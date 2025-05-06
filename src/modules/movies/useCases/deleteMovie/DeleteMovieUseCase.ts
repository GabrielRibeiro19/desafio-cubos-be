import { inject, injectable } from "tsyringe";

import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteMovieUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string, user_id: string): Promise<void> {
    const movieExists = await this.moviesRepository.findById(id);

    if (!movieExists) {
      throw new AppError("Filme não existe");
    }

    if (movieExists.user_id !== user_id) {
      throw new AppError("Você não tem permissão para deletar este filme");
    }

    if (movieExists.image) {
      await this.storageProvider.delete(movieExists.image, "movies");
    }

    if (movieExists.image_secondary) {
      await this.storageProvider.delete(movieExists.image_secondary, "movies");
    }

    await this.moviesRepository.deleteById(id);
  }
}

export { DeleteMovieUseCase };

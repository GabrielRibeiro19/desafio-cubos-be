import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateGenreDTO } from "@modules/genres/dtos/ICreateGenreDTO";
import { IGenresRepository } from "@modules/genres/repositories/IGenresRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateGenreUseCase {
  constructor(
    @inject("GenresRepository")
    private genresRepository: IGenresRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    id,
    title,
    user_id,
  }: ICreateGenreDTO): Promise<ICreateGenreDTO> {
    if (!title) {
      throw new AppError("Título é obrigatório");
    }

    if (!user_id) {
      throw new AppError("Usuário é obrigatório");
    }

    const titleAlreadyExists = await this.genresRepository.findByTitleAndUser(
      title,
      user_id
    );

    if (titleAlreadyExists) {
      throw new AppError("Gênero já existe");
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não existe");
    }

    const genre = await this.genresRepository.create({
      id,
      title,
      user_id,
    });

    return genre;
  }
}

export { CreateGenreUseCase };

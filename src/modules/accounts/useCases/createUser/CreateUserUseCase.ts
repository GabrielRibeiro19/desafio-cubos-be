import { hash } from "bcryptjs";
import { instanceToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUsersDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Usuário já cadastrado");
    }

    if (!password || !email || !name) {
      throw new AppError("Nome, email e senha são obrigatórios");
    }

    const passwordHash = await hash(password, 8);

    const createUserResponse = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const user = instanceToInstance(createUserResponse);

    return user;
  }
}

export { CreateUserUseCase };

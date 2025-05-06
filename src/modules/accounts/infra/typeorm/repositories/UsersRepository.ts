import { Repository, getRepository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, name, email, password }: ICreateUsersDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
    });

    await this.repository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };

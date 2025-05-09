import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const createUserResponse = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(createUserResponse);
  }
}

export { CreateUserController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateGenreUseCase } from "./CreateGenreUseCase";

class CreateGenreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { title } = req.body;

    const createGenreUseCase = container.resolve(CreateGenreUseCase);

    const createGenre = await createGenreUseCase.execute({
      title,
      user_id: id,
    });

    return res.status(201).json(createGenre);
  }
}

export { CreateGenreController };

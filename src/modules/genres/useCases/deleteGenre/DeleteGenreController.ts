import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteGenreUseCase } from "./DeleteGenreUseCase";

class DeleteGenreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const genreDeleteUseCase = container.resolve(DeleteGenreUseCase);
    await genreDeleteUseCase.execute(id, user_id);

    return res.status(204).send();
  }
}

export { DeleteGenreController };

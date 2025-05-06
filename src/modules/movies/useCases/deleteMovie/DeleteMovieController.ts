import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteMovieUseCase } from "./DeleteMovieUseCase";

class DeleteMovieController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const deleteMovieUseCase = container.resolve(DeleteMovieUseCase);

    await deleteMovieUseCase.execute(id, user_id);

    return res.status(204).send();
  }
}

export { DeleteMovieController };

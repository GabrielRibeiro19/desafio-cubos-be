import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetMovieUseCase } from "./GetMovieUseCase";

class GetMovieController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user_id = req.user.id;

    const getMovieUseCase = container.resolve(GetMovieUseCase);

    const movie = await getMovieUseCase.execute(id, user_id);
    return res.json(movie);
  }
}

export { GetMovieController };

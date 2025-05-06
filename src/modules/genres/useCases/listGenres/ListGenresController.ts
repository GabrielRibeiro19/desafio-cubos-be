import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListGenresUseCase } from "./ListGenresUseCase";

class ListGenresController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listGenresUseCase = container.resolve(ListGenresUseCase);

    const genres = await listGenresUseCase.execute(id);

    return res.json(genres);
  }
}

export { ListGenresController };

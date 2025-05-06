import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMoviesUseCase } from "./ListMoviesUseCase";

class ListMoviesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      page,
      per_page,
      q,
      duration_range,
      genre_ids,
      start_release_at,
      end_release_at,
    } = req.query;

    const intervar_release = start_release_at &&
      end_release_at && {
        start_at: String(start_release_at),
        end_at: String(end_release_at),
      };

    const user_id = req.user.id;

    const query = q && String(q);

    const listMoviesUseCase = container.resolve(ListMoviesUseCase);

    const movies = await listMoviesUseCase.execute({
      user_id,
      page: parseInt(page as string, 10) || 1,
      per_page: parseInt(per_page as string, 10) || 10,
      query,
      duration_range: duration_range as
        | "less_than_1h"
        | "between_1h_and_2h"
        | "more_than_2h",
      genre_ids: genre_ids ? String(genre_ids).split(",") : undefined,
      release_date: intervar_release,
    });

    return res.json(movies);
  }
}

export { ListMoviesController };

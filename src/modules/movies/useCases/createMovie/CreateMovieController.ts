import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMovieUseCase } from "./CreateMovieUseCase";

interface IMulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

class CreateMovieController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      title,
      original_title,
      genre_ids,
      trailer_url,
      popularity,
      votes,
      rating,
      release_date,
      status,
      language,
      budget,
      revenue,
      tagline,
      overview,
      profit,
      duration,
    } = req.body;

    const files = req.files as IMulterFiles;

    // Extract filenames or set as undefined if not present
    const image = files?.image?.[0]?.filename;
    const image_secondary = files?.image_secondary?.[0]?.filename;

    const { id: user_id } = req.user;

    const createMovieUseCase = container.resolve(CreateMovieUseCase);

    const createMovie = await createMovieUseCase.execute({
      id,
      genre_ids: genre_ids || undefined,
      user_id,
      title,
      tagline,
      original_title,
      image,
      overview,
      image_secondary,
      trailer_url,
      popularity: Number(popularity),
      votes: Number(votes),
      rating: Number(rating),
      release_date: new Date(release_date),
      status,
      language,
      budget: Number(budget),
      revenue: Number(revenue),
      profit: Number(profit),
      duration: Number(duration),
    });

    return res.status(201).json(createMovie);
  }
}

export { CreateMovieController };

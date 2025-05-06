import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateMovieUseCase } from "./UpdateMovieUseCase";

interface IMulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

class UpdateMovieController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      title,
      tagline,
      original_title,
      genre_ids,
      overview,
      trailer_url,
      popularity,
      votes,
      rating,
      release_date,
      status,
      language,
      budget,
      revenue,
      profit,
      duration,
    } = req.body;

    const { id: user_id } = req.user;

    // Handle files from req.files (now an object with field names as keys)
    const files = req.files as IMulterFiles;

    // Extract filenames or set as undefined if not present
    const image = files?.image?.[0]?.filename;
    const image_secondary = files?.image_secondary?.[0]?.filename;

    const updateMovieUseCase = container.resolve(UpdateMovieUseCase);

    const updatedMovie = await updateMovieUseCase.execute({
      id,
      user_id,
      title,
      overview,
      tagline,
      original_title,
      image,
      image_secondary,
      genre_ids: genre_ids || undefined,
      trailer_url,
      popularity: popularity ? Number(popularity) : undefined,
      votes: votes ? Number(votes) : undefined,
      rating: rating ? Number(rating) : undefined,
      release_date: release_date ? new Date(release_date) : undefined,
      status,
      language,
      budget: budget ? Number(budget) : undefined,
      revenue: revenue ? Number(revenue) : undefined,
      profit: profit ? Number(profit) : undefined,
      duration: duration ? Number(duration) : undefined,
    });

    return res.status(200).json(updatedMovie);
  }
}

export { UpdateMovieController };

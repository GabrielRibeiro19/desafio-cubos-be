import { Genre } from "@modules/genres/infra/typeorm/entities/Genre";

interface IResponseMovieDTO {
  id: string;
  user_id: string;
  title: string;
  overview: string;
  tagline: string;
  original_title: string;
  image: string;
  image_secondary: string;
  trailer_url: string;
  popularity: number;
  votes: number;
  rating: number;
  release_date: Date;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  profit: number;
  duration: number;
  created_at: Date;
  updated_at: Date;
  image_url(): string;
  image_secondary_url(): string;
  genres: Genre[];
}

export { IResponseMovieDTO };

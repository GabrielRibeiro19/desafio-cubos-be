interface IUpdateMovieDTO {
  id: string;
  user_id: string;
  tagline?: string;
  title?: string;
  overview?: string;
  original_title?: string;
  image?: string;
  image_secondary?: string;
  genre_ids?: string[];
  trailer_url?: string;
  popularity?: number;
  votes?: number;
  rating?: number;
  release_date?: Date;
  status?: string;
  language?: string;
  budget?: number;
  revenue?: number;
  profit?: number;
  duration?: number;
}

export { IUpdateMovieDTO };

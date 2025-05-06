interface IListMoviesOptions {
  page: number;
  per_page: number;
  query?: string;
  user_id: string;
  genre_ids?: string[];
  duration_range?: "less_than_1h" | "between_1h_and_2h" | "more_than_2h";
  release_date?: {
    start_at: string;
    end_at: string;
  };
}

export { IListMoviesOptions };

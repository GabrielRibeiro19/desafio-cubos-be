import { getRepository, Repository } from "typeorm";

import { ICreateMovieDTO } from "@modules/movies/dtos/ICreateMovieDTO";
import { IListMoviesOptions } from "@modules/movies/dtos/IListMoviesOptions";
import { IResponseListMoviesDTO } from "@modules/movies/dtos/IResponseListMoviesDTO";
import { IUpdateMovieDTO } from "@modules/movies/dtos/IUpdateMovieDTO";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";

import { Movie } from "../entities/Movie";

class MoviesRepository implements IMoviesRepository {
  private repository: Repository<Movie>;

  constructor() {
    this.repository = getRepository(Movie);
  }

  async create({
    id,
    budget,
    tagline,
    overview,
    title,
    release_date,
    user_id,
    original_title,
    popularity,
    revenue,
    status,
    trailer_url,
    votes,
    rating,
    duration,
    image,
    language,
    profit,
    image_secondary,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = this.repository.create({
      id,
      budget,
      tagline,
      title,
      release_date,
      user_id,
      original_title,
      popularity,
      revenue,
      status,
      trailer_url,
      votes,
      rating,
      duration,
      image,
      language,
      overview,
      profit,
      image_secondary,
    });

    await this.repository.save(movie);

    return movie;
  }

  async update({
    id,
    budget,
    title,
    tagline,
    overview,
    release_date,
    original_title,
    popularity,
    revenue,
    status,
    trailer_url,
    votes,
    rating,
    duration,
    image,
    language,
    profit,
    image_secondary,
  }: IUpdateMovieDTO): Promise<Movie> {
    // Find the existing movie first
    const movie = await this.findById(id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    // Update only provided fields
    if (title !== undefined) movie.title = title;
    if (original_title !== undefined) movie.original_title = original_title;
    if (budget !== undefined) movie.budget = budget;
    if (release_date !== undefined) movie.release_date = release_date;
    if (popularity !== undefined) movie.popularity = popularity;
    if (revenue !== undefined) movie.revenue = revenue;
    if (status !== undefined) movie.status = status;
    if (trailer_url !== undefined) movie.trailer_url = trailer_url;
    if (votes !== undefined) movie.votes = votes;
    if (rating !== undefined) movie.rating = rating;
    if (duration !== undefined) movie.duration = duration;
    if (language !== undefined) movie.language = language;
    if (profit !== undefined) movie.profit = profit;
    if (tagline !== undefined) movie.tagline = tagline;
    if (overview !== undefined) movie.overview = overview;
    if (image !== undefined) movie.image = image;
    if (image_secondary !== undefined) movie.image_secondary = image_secondary;

    await this.repository.save(movie);

    return movie;
  }

  async list({
    page,
    per_page,
    query,
    user_id,
    duration_range,
    genre_ids,
    release_date,
  }: IListMoviesOptions): Promise<IResponseListMoviesDTO> {
    const skip = per_page * (page - 1);
    const queryBuilder = this.repository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.genres", "genre")
      .where("movie.user_id = :user_id", { user_id });

    // Lógica para filtrar por faixa de duração
    if (duration_range) {
      switch (duration_range) {
        case "less_than_1h":
          // Menos de 60 minutos
          queryBuilder.andWhere("movie.duration < :minDuration", {
            minDuration: 60,
          });
          break;
        case "between_1h_and_2h":
          // Entre 60 e 120 minutos
          queryBuilder.andWhere("movie.duration >= :minDuration", {
            minDuration: 60,
          });
          queryBuilder.andWhere("movie.duration <= :maxDuration", {
            maxDuration: 120,
          });
          break;
        case "more_than_2h":
          // Mais de 120 minutos
          queryBuilder.andWhere("movie.duration > :maxDuration", {
            maxDuration: 120,
          });
          break;
        default:
          // Nenhum filtro de duração aplicado
          break;
      }
    }

    if (genre_ids) {
      queryBuilder.andWhere("genre.id IN (:...genre_ids)", { genre_ids });
    }

    if (release_date && release_date.start_at) {
      queryBuilder.andWhere("movie.release_date >= :start_at", {
        start_at: release_date.start_at,
      });
    }

    if (release_date && release_date.end_at) {
      queryBuilder.andWhere("movie.release_date <= :end_at", {
        end_at: release_date.end_at,
      });
    }

    if (query) {
      queryBuilder.andWhere(
        `(
          movie.title LIKE :q OR
          movie.original_title LIKE :q
        )`,
        { q: `%${query}%` }
      );
    }

    const [data, total] = await queryBuilder
      .orderBy("movie.created_at", "DESC")
      .skip(skip)
      .take(per_page)
      .getManyAndCount();

    const last_page = Math.ceil(total / per_page);

    return {
      data,
      page,
      total,
      last_page,
    };
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.repository.findOne({
      where: { id },
      relations: ["genres"],
    });
    return movie;
  }

  async findByTitle(title: string): Promise<Movie> {
    const movie = await this.repository.findOne({ title });

    return movie;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  // Implementar o método
  async findByReleaseDate(startDate: Date, endDate: Date): Promise<Movie[]> {
    const movies = await this.repository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.genres", "genre")
      .where("movie.release_date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany();

    return movies;
  }
}

export { MoviesRepository };

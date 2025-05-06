import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Movie } from "@modules/movies/infra/typeorm/entities/Movie";

import { Genre } from "./Genre";

@Entity("genres_movies")
class GenreMovie {
  @PrimaryColumn()
  id: string;

  @Column()
  movie_id: string;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({ name: "movie_id" })
  movies: Movie;

  @Column()
  genre_id: string;

  @ManyToOne(() => Genre, (genre) => genre.id)
  @JoinColumn({ name: "genre_id" })
  genre: Genre;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { GenreMovie };

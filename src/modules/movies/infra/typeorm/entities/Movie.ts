import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Genre } from "@modules/genres/infra/typeorm/entities/Genre";

@Entity("movies")
class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  overview: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  tagline: string;

  @Expose({ name: "image_url" })
  image_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/movies/${this.image}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/movies/${this.image}`;
      default:
        return null;
    }
  }

  @Expose({ name: "image_secondary_url" })
  image_secondary_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/movies/${this.image_secondary}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/movies/${this.image_secondary}`;
      default:
        return null;
    }
  }

  @ManyToMany(() => Genre)
  @JoinTable({
    name: "genres_movies",
    joinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "genre_id",
      referencedColumnName: "id",
    },
  })
  genres: Genre[];

  @Column({ nullable: true })
  image_secondary: string;

  @Column()
  trailer_url: string;

  @Column("float")
  popularity: number;

  @Column("integer")
  votes: number;

  @Column("float")
  rating: number;

  @Column()
  release_date: Date;

  @Column()
  status: string;

  @Column()
  language: string;

  @Column("float")
  budget: number;

  @Column("float")
  revenue: number;

  @Column("float")
  profit: number;

  @Column()
  duration: number;

  @Column()
  user_id: string;

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

export { Movie };

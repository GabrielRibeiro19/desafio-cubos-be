import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGenresMovies1746359760534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genres_movies",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "movie_id",
            type: "varchar",
          },
          {
            name: "genre_id",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKGenresMoviesUsers",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKGenresMoviesMovies",
            referencedTableName: "movies",
            referencedColumnNames: ["id"],
            columnNames: ["movie_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKGenresMoviesGenres",
            referencedTableName: "genres",
            referencedColumnNames: ["id"],
            columnNames: ["genre_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("genres_movies");
  }
}

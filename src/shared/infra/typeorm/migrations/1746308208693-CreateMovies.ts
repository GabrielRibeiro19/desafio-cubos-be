import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovies1746308208693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movies",
        columns: [
          {
            name: "id",
            type: "varchar(255)",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar(255)",
          },
          {
            name: "title",
            type: "varchar(255)",
          },
          {
            name: "original_title",
            type: "varchar(255)",
          },
          {
            name: "overview",
            type: "text",
          },
          {
            name: "tagline",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "image",
            type: "varchar(255)",
          },
          {
            name: "image_secondary",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "trailer_url",
            type: "varchar(255)",
          },
          {
            name: "popularity",
            type: "float",
          },
          {
            name: "votes",
            type: "integer",
          },
          {
            name: "rating",
            type: "float",
          },
          {
            name: "release_date",
            type: "date",
          },
          {
            name: "status",
            type: "varchar(255)",
          },
          {
            name: "language",
            type: "varchar(255)",
          },
          {
            name: "budget",
            type: "float",
          },
          {
            name: "revenue",
            type: "float",
          },
          {
            name: "profit",
            type: "float",
          },
          {
            name: "duration",
            type: "integer",
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
            name: "FKMoviesUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movies");
  }
}

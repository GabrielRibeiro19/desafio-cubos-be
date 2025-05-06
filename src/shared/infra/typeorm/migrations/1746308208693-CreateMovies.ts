import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovies1746308208693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movies",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "original_title",
            type: "varchar",
          },
          {
            name: "overview",
            type: "text",
          },
          {
            name: "tagline",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image",
            type: "varchar",
          },
          {
            name: "image_secondary",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "trailer_url",
            type: "varchar",
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
            type: "varchar",
          },
          {
            name: "language",
            type: "varchar",
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

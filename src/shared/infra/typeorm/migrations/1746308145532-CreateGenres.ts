import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGenres1746308145532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genres",
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
            name: "FKGenresUsers",
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
    await queryRunner.dropTable("genres");
  }
}

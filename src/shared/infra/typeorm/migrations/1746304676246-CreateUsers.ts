import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1746304676246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar(255)",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(255)",
          },
          {
            name: "email",
            type: "varchar(255)",
            isUnique: true,
          },
          {
            name: "password",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}

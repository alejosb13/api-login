import {MigrationInterface, Table, QueryRunner} from "typeorm";

export class user1633561903980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "username",
                    type: "varchar",
                    length:"60",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                  name: 'createAt',
                  type: 'timestamp',
                  default: 'now()'
                },
                {
                  name: 'updateAt',
                  type: 'timestamp',
                  default: 'now()'
                }
            ]
        }), true)
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("users");
    }

}

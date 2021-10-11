import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class role1633561894835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "role",
                    type: "varchar",
                    length:"15"
                },
                {
                    name: "display_name",
                    type: "varchar",
                    length:"15",
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
        


        // await queryRunner.createIndex("question", new TableIndex({
        //     name: "IDX_QUESTION_NAME",
        //     columnNames: ["name"]
        // }));

        // await queryRunner.createTable(new Table({
        //     name: "answer",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //         },
        //         {
        //           name: 'created_at',
        //           type: 'timestamp',
        //           default: 'now()'
        //         }
        //     ]
        // }), true);

        // await queryRunner.addColumn("answer", new TableColumn({
        //     name: "questionId",
        //     type: "int"
        // }));

        // await queryRunner.createForeignKey("answer", new TableForeignKey({
        //     columnNames: ["questionId"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "question",
        //     onDelete: "CASCADE"
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.dropTable("roles");
    }

}

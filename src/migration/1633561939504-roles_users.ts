import {MigrationInterface, TableForeignKey, QueryRunner,Table} from "typeorm";

export class rolesUsers1633561939504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles_users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },{
                    name: "id_role",
                    type: "int"
                },{
                    name: "id_user",
                    type: "int"
                },
 
            ]
        }), true)
        
        await queryRunner.createForeignKey("roles_users", new TableForeignKey({
            columnNames: ["id_user"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        
        await queryRunner.createForeignKey("roles_users", new TableForeignKey({
            columnNames: ["id_role"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("roles_users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("id_role") !== -1);
        await queryRunner.dropForeignKey("roles_users", foreignKey);
        // await queryRunner.dropColumn("roles_users", "id_role");
        
        
        const tableuser = await queryRunner.getTable("roles_users");
        const foreignKeyuser = tableuser.foreignKeys.find(fk => fk.columnNames.indexOf("id_user") !== -1);
        await queryRunner.dropForeignKey("roles_users", foreignKeyuser);
        
        // await queryRunner.dropColumn("roles_users", "id_user");
        
        await queryRunner.dropTable("roles_users");
    }

}

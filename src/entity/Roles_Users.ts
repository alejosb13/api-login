import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne,JoinColumn} from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Entity()
export class Roles_Users {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public id_role!: number;

    @Column()
    public id_user!: number;

    @JoinColumn({
        name: "id_role",
    })
    @ManyToOne(() => Roles, role => role.id)
    public role!: Roles;

    @JoinColumn({
        name: "id_user",
    })
    @ManyToOne(() => Users, user => user.id)
    public user!: Users;
}

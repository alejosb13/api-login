import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique,OneToMany} from "typeorm";
import { IsNotEmpty } from "class-validator"
import { Roles_Users } from "./Roles_Users";
import * as bcriptjs from "bcryptjs"
@Entity()
@Unique(["role"])

export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @IsNotEmpty()
    display_name: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Roles_Users, roles_users => roles_users.role)
    public roles_users!: Roles_Users[];
}

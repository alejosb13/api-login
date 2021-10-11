import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique ,OneToMany} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail} from "class-validator"
import * as bcriptjs from "bcryptjs"
import { Roles_Users } from "./Roles_Users";
@Entity()
@Unique("unique",["username"])

export class Users {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsEmail()
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    // @Unique({ unique: true })
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    // @Column()
    // @IsNotEmpty()
    // role: string;
    
    @Column()
    @CreateDateColumn()
    createAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updateAt: Date;
    
    @OneToMany(() => Roles_Users, roles_users => roles_users.user)
    public users_roles!: Roles_Users[];
    
    hashpassword():void{
       const salt =  bcriptjs.genSaltSync(10)
       this.password = bcriptjs.hashSync(this.password,salt)
    }
    
    checkPassword(password:string):boolean{
        return bcriptjs.compareSync(password,this.password)
    }
}

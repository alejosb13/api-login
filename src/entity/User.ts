import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail} from "class-validator"
import * as bcriptjs from "bcryptjs"
@Entity()
@Unique(["username"])

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;
    
    @Column()
    @CreateDateColumn()
    createAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashpassword():void{
       const salt =  bcriptjs.genSaltSync(10)
       this.password = bcriptjs.hashSync(this.password,salt)
    }
    
    checkPassword(password:string):boolean{
        return bcriptjs.compareSync(password,this.password)
    }
}

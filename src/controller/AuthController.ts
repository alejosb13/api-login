import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { Users } from "../entity/Users"
import * as Jwt  from "jsonwebtoken";
import config from "../config/config"
import {  validate } from "class-validator";

class AuthController {
    async login (req: Request,res: Response){
        const { username, password } = req.body
        
        if(!(username && password)){
            return res.status(400).json({"message": "Username & Password are required !"})
        }
        
        const userRepository = getRepository(Users)
        let user:Users;
        
        try {
            user = await userRepository.findOne({ 
                where : {username},
                relations: ["users_roles"],
            })
            
            // console.log(user);
            
            if(user.users_roles.length > 0){
                if(!user.checkPassword(password)) return res.status(400).json({"message": "Username or Password are incorrect"}) 
            }else{
                return res.status(400).json({"message": "User does not have a role"})
            }
            
            
        } catch (error) {
            return res.status(400).json({"message": "Username or Password incorrect"})
        }
        
        let users_roles = user.users_roles
        const token = Jwt.sign({userID:user.id,username: user.username, roles: users_roles},config.JWTSecret,{expiresIn:"1h"})
        
        res.json({"message": "Ok!", token})
    
    }

    async changePassword (req: Request,res: Response){
        const { userID } = res.locals.JWTPayload
        const { oldPassword, newPassword } = req.body
        
        if(!(oldPassword && newPassword)){
            return res.status(400).json({"message": "Old password & new password are required !"})
        }
        
        const userRepository = getRepository(Users)
        let user:Users;
        
        try {
            user = await userRepository.findOneOrFail({ where : {id:userID}})       

                 
        } catch (error) {
            return res.status(400).json({"message": "Somenthing goes wrong!"})
        }
        
        console.log(user.checkPassword(oldPassword));
        
        if(!user.checkPassword(oldPassword)) return res.status(400).json({"message": "Check your old password!"}) 
        
        user.password = newPassword
        
        const errors = await validate(user,config.validationOpt)
        if(errors.length > 0){
            res.send(errors)
        }
        
        user.hashpassword()
        userRepository.save(user)
        
        res.json({"message": "Password change!"})
    
    }
}

export default new AuthController();
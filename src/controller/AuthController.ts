import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as Jwt  from "jsonwebtoken";
import config from "../config/config"
import {  validate } from "class-validator";

export default class AuthController {
    constructor() {}
    
    static login = async (req: Request,res: Response) => {
        const { username, password } = req.body
        
        if(!(username && password)){
            return res.status(400).json({"message": "Username & Password are required !"})
        }
        
        const userRepository = getRepository(User)
        let user:User;
        
        try {
            user = await userRepository.findOneOrFail({ where : {username}})
            
            if(!user.checkPassword(password)) return res.status(400).json({"message": "Username or Password are incorrect"}) 
            
        } catch (error) {
            return res.status(400).json({"message": "Username or Password incorrect"})
            
        }
        
        const token = Jwt.sign({id:user.id,username: user.username},config.JWTSecret,{expiresIn:"1h"})
        
        res.json({"message": "Ok!", token})
    
    }

    static changePassword = async (req: Request,res: Response) => {
        const { id } = res.locals.JWTPayload
        const { oldPassword, newPassword } = req.body
        
        if(!(oldPassword && newPassword)){
            return res.status(400).json({"message": "Old password & new password are required !"})
        }
        
        const userRepository = getRepository(User)
        let user:User;
        
        try {
            user = await userRepository.findOneOrFail({ where : {id}})            
        } catch (error) {
            return res.status(400).json({"message": "Somenthing goes wrong!"})
        }
        
        if(!user.checkPassword(oldPassword)) return res.status(400).json({"message": "Check your old password!"}) 
        
        user.password = newPassword
        
        const validationOpt = {validationError:{target:false,value:false}}
        const errors = await validate(user,validationOpt)
        if(errors.length > 0){
            res.send(errors)
        }
        
        user.hashpassword()
        userRepository.save(user)
        
        res.json({"message": "Password change!"})
    
    }
}

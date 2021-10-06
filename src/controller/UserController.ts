import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import {  validate } from "class-validator";

export default class UserController {

    static getAll = async (req:Request, res:Response)=>{
        const userRepository = getRepository(User)
        
        try {
            const users:User[] = await userRepository.find()
        
            if(users.length > 0){
                res.send(users)
            }else{
                return res.status(400).json({"message":"No result"})
            }
        } catch (error) {
            return res.status(400).json({"message":"No result"})
        }
    }
    
    static getById =  async (req:Request, res:Response)=>{
        const {id} =  req.params
        const userRepository = getRepository(User)
        
        try {
            const user:User = await userRepository.findOneOrFail(id)
                
            res.send(user)
        } catch (error) {
            return res.status(400).json({"message":"No result"})
        }
    }

    static newUSer =  async (req:Request, res:Response)=>{
        const {username, password, role } =  req.body
        try {
            const user = new User();
            user.username = username
            user.password = password
            user.role = role
            
            const validationOpt = {validationError:{target:false,value:false}}
            const errors = await validate(user,validationOpt)
            if(errors.length > 0){
                return res.status(400).json(errors)
            }
            
            const userRepository = getRepository(User)
            user.hashpassword()
            await userRepository.save(user)
            
        } catch (error) {
            return res.status(409).json({"message":"Username exist!"})
        }
        res.send("User Created")
    }

    static editUser =  async (req:Request, res:Response)=>{
        const { id } =  req.params
        const {username, role } =  req.body
        const userRepository = getRepository(User)
        let  user:User;
        
        try {    
            user = await userRepository.findOneOrFail(id)   
            user.username = username
            user.role = role
    
        } catch (error) {
            return res.status(404).json({"message":"User Not found"})
        }
        
        const validationOpt = {validationError:{target:false,value:false}}
        const errors = await validate(user,validationOpt)
        if(errors.length > 0){
            return res.status(400).json(errors)
        }
        
        try {
            await userRepository.save(user)   
        } catch (error) {
            return res.status(409).json({"message":"Username already in use"})
        }
        
        res.send("User edited")
    }
    
    static deleteUser =  async (req:Request, res:Response)=>{
        const { id } =  req.params
        const userRepository = getRepository(User)
        let  user:User;
        
        try {    
            user = await userRepository.findOneOrFail(id)   
        } catch (error) {
            return res.status(404).json({"message":"User Not found"})
        }

        try {
            await userRepository.delete(id)   
        } catch (error) {
            return res.status(409).json({"message":"Error !"})
        }
        
        res.send("User Deleted")
    }
    
}
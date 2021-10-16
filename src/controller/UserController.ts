import { getRepository,getManager } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { Roles_Users } from "../entity/Roles_Users";
import { Roles } from "../entity/Roles";
import config from "../config/config"
// import { User } from "../entity/User";
import {  validate } from "class-validator";

class UserController {

    async getAll (req:Request, res:Response){
        // const userRepository = getRepository(Users)
        
        try {
            
            const users:Users[] =  await getManager()
                .createQueryBuilder(Users,"user")
                .innerJoin(Roles_Users, 'roles_users', 'user.id = roles_users.id_user') //INNER JOIN table2 t2 ON t1.id = t2.id
                .innerJoin(Roles, 'roles', 'roles_users.id_role = roles.id') //INNER JOIN table2 t2 ON t1.id = t2.id
                .select("*")
                .getRawMany();
        
                    
            if(users.length > 0){
                res.send(users)
            }else{
                return res.status(400).json({"message":"No result"})
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({"message":"No result"})
        }
    }
    
    async getById (req:Request, res:Response){
        const { id } =  req.params
        // const userRepository = getRepository(Users)
        
        try {
            // const user:Users = await userRepository.findOneOrFail(id)
            const user:Users =  await getManager()
            .createQueryBuilder(Users,"user")
            .innerJoin(Roles_Users, 'roles_users', 'user.id = roles_users.id_user') //INNER JOIN table2 t2 ON t1.id = t2.id
            .innerJoin(Roles, 'roles', 'roles_users.id_role = roles.id') //INNER JOIN table2 t2 ON t1.id = t2.id
            .where("user.id = :id", { id })
            .select("*")
            .getRawOne();
            
            res.send(user)
        } catch (error) {
            return res.status(400).json({"message":"No result"})
        }
    }

    async newUSer (req:Request, res:Response){
        const {username, password } =  req.body
        let user:Users
        let roles:Roles
        let roles_user:Roles_Users
        
        try {
            /*** USER ***/
            const userRepository = getRepository(Users)
            user = new Users();
            user.username = username
            user.password = password
            // user.role = role -> debe ser entero
            
            // const validationOpt = {validationError:{target:false,value:false}}
            const errors = await validate(user,config.validationOpt)
            
            if(errors.length > 0) return res.status(400).json(errors)
            
            user.hashpassword()
            await userRepository.save(user)
        } catch (error) {
            console.log(error);
            return res.status(409).json({"message":"Username exist!"})
        }        
        
        res.send("User Created")
    }

    async editUser (req:Request, res:Response){
        const { id } =  req.params
        const body =  req.body
        const username =  body.username || false
        const role =  body.role || false
        
        if(username){
            const userRepository = getRepository(Users)
            let  user:Users;
            
            try {    
                user = await userRepository.findOneOrFail(id)   
                user.username = username
                // console.log(user);
                
                // user.role = role
        
            } catch (error) {
                return res.status(404).json({"message":"User Not found"})
            }
            

            const errors = await validate(user,config.validationOpt)
            if(errors.length > 0){
                return res.status(400).json(errors)
            }
            
            try {
                await userRepository.save(user)   
            } catch (error) {
                return res.status(409).json({"message":"Username already in use"})
            }
        }
        
        /*** edited Role  ***/
        
        if(role){
            const roles_UserRepository = getRepository(Roles_Users)
            let  roles_user:Roles_Users;
            try {    
                // roles_user = await roles_UserRepository.findOneOrFail()   
                roles_user = await roles_UserRepository.findOne({ where:{ id_user: id }});
                roles_user.id_role = role
                // console.log(user);
                
                // user.role = role
        
            } catch (error) {
                return res.status(404).json({"message":"Role Not found"})
            }
            
            const errors_roles_user = await validate(roles_user,config.validationOpt)
            if(errors_roles_user.length > 0){
                return res.status(400).json(errors_roles_user)
            }
            
            try {
                await roles_UserRepository.save(roles_user)   
            } catch (error) {
                return res.status(409).json({"message":"Role already in use"})
            } 
        }
        
        if(username && role){
            res.send("Username & Role edited") 
        }else if(role){
            res.send("Role edited") 
        }else if (username) {
            res.send("User edited")
        }else{
            return res.status(409).json({"message":"Not params"})
        }
        
    }
    
    async deleteUser (req:Request, res:Response) {
        const { id } =  req.params
        const userRepository = getRepository(Users)
        let  user:Users;
        
        const roles_UserRepository = getRepository(Roles_Users)
        let  roles_user:Roles_Users;
        
        try {    
            // roles_user = await roles_UserRepository.findOneOrFail()   
            roles_user = await roles_UserRepository.findOne({ where:{ id_user: id }});

            // console.log(user);
            
            // user.role = role
    
        } catch (error) {
            return res.status(404).json({"message":"Role Not found"})
        }
        
        try {
            await roles_UserRepository.delete(roles_user.id)   
        } catch (error) {
            return res.status(409).json({"message":"Error delete relationship!"})
        } 
        
        try {    
            user = await userRepository.findOneOrFail(id)   
        } catch (error) {
            return res.status(404).json({"message":"User Not found"})
        }

        try {
            await userRepository.delete(id)   
        } catch (error) {
            return res.status(409).json({"message":"Error delete User !"})
        }
        
        res.send("User Deleted")
    }
    
}

export default new UserController();
import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { Roles } from "../entity/Roles"
import { Roles_Users } from "../entity/Roles_Users"
import { Users } from "../entity/Users"
import config from "../config/config"
import { validate } from "class-validator";

class RoleController {
    async getAll (req: Request,res: Response){
        console.log(req.body);
        
        const roleRepository = getRepository(Roles)
        
        try {
            const users:Roles[] = await roleRepository.find()
        
            if(users.length > 0){
                res.send(users)
            }else{
                return res.status(400).json({"message":"No result"})
            }
        } catch (error) {
            return res.status(400).json({"message":"No result"})
        }
    }
    
    async newRole (req: Request,res: Response){
        console.log(req.body);
        
        const { role, display_name } = req.body
        
        if(!(role && display_name)){
            return res.status(400).json({"message": "Role & Display Name are required !"})
        }
        
        let Role:Roles
        try {
            /*** ROle ***/
            const roleRepository = getRepository(Roles)
            
            Role = new Roles();
            Role.role = role 
            Role.display_name = display_name
            
            const errorsrole = await validate(Role,config.validationOpt)
            if(errorsrole.length > 0) return res.status(400).json(errorsrole)
            
            await roleRepository.save(Role)
        } catch (error) {
            return res.status(409).json({"message":"Role exist!"})   
        }
        
        return res.status(200).json({"message":"Role Created"})   
    }

    async editRole (req: Request,res: Response){
        const { id } =  req.params
        const body =  req.body
        const display_name =  body.display_name || false
        const role =  body.role || false

        if(display_name && role){
            const roleRepository = getRepository(Roles)
            let  Role:Roles;
            
            try {    
                Role              = await roleRepository.findOneOrFail(id)   
                Role.role         = role
                Role.display_name = display_name
        
            } catch (error) {
                return res.status(404).json({"message":"Role Not found"})
            }
            

            const errors = await validate(Role,config.validationOpt)
            if(errors.length > 0){
                return res.status(400).json(errors)
            }
            
            try {
                await roleRepository.save(Role)   
                return res.send("Role edited") 
            } catch (error) {
                return res.status(409).json({"message":"The Role exists"})
            }
            
        }
        
        return res.status(409).json({"message":"Not params"})
    }

    async deleteRole (req: Request,res: Response){
        const { id } =  req.params
        const rolesRepository = getRepository(Roles)
        let  Role:Roles;
        
        const roles_UserRepository = getRepository(Roles_Users)
        let  roles_user:Roles_Users;
        
        try {    
            roles_user = await roles_UserRepository.findOneOrFail({ where:{ id_role: id }});

        } catch (error) {
            return res.status(404).json({"message":"Role Not found"})
        }
        
        try {
            await roles_UserRepository.delete(roles_user.id)   
        } catch (error) {
            console.log(error);
            
            return res.status(409).json({"message":"Error delete relationship!"})
        } 
        
        try {    
            Role = await rolesRepository.findOneOrFail(id)   
        } catch (error) {
            return res.status(404).json({"message":"Role Not found"})
        }

        try {
            await rolesRepository.delete(id)   
        } catch (error) {
            return res.status(409).json({"message":"Error delete User !"})
        }
        
        res.send("Role Deleted")
    }
    
    async setRoleToUser (req: Request, res: Response){
        const { idRole,idUser } =  req.params

        if(idRole && idUser){
            
            const rolesRepository = getRepository(Roles)
            try {
                await rolesRepository.findOneOrFail(idRole)
                
            } catch (error) {
                return res.status(409).json({"message":"Role not exist!"})
            }
            
            
            const userRepository = getRepository(Users)
            try {
                await userRepository.findOneOrFail(idUser)
                
            } catch (error) {
                return res.status(409).json({"message":"User not exist!"})
            }
            
            const roles_UserRepository = getRepository(Roles_Users)
            
            let Roles_user = new Roles_Users()
            Roles_user.id_role = Number(idRole)
            Roles_user.id_user = Number(idUser)
            
            const errors_roles_user = await validate(Roles_user,config.validationOpt)
            if(errors_roles_user.length > 0){
                return res.status(400).json(errors_roles_user)
            }
            
            try {    
                await roles_UserRepository.save(Roles_user)
                return res.send("Relationship create !") 
                
            } catch (error) {
                return res.status(409).json({"message":"Error create relationship!"})
            }

        }
        
        return res.status(409).json({"message":"Not params"})
    }

}

export default new RoleController();
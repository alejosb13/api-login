import { getRepository,In } from "typeorm"
import { Request, Response, NextFunction } from "express";
import { Roles } from "../entity/Roles";
import { access } from "fs";

export const checkRole = ( roles:string[] )=>{
    return async (req:Request,res:Response,next:NextFunction) => {
        let rolesJWT = res.locals.JWTPayload.roles
        let Access:boolean = false
         
        if(rolesJWT.length > 0){
            const rolesRepository  = getRepository(Roles)
            let rolesEntity:Roles[];
            let rolesToken = rolesJWT.map((rol:any)=> rol.id_role)
            
            try {
                rolesEntity = await rolesRepository.find({
                    select:["display_name"],
                    where: {
                        id: In(rolesToken),
                    },
                    
                })

                if(rolesEntity.length > 0){
                    let accessquantity = rolesEntity.filter((rol:Roles) => roles.includes(rol.display_name))
                    if(accessquantity.length > 0 ) Access = true 
                }
               
            } catch (error) {
                return res.status(404).json({"messaje": "Role not found"})
            }
            
        }else{
            return res.status(404).json({"messaje": "Does not have a role"})
        }
        
        if (Access) {
            next()
        }else{
            return res.status(404).json({"messaje": "Not authorized!"})
        }

    }
} 
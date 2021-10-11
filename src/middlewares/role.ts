import { getRepository } from "typeorm"
import { Request, Response, NextFunction } from "express";
import { Users } from "../entity/Users";

export const checkRole = ( roles:string[] )=>{
    return async (req:Request,res:Response,next:NextFunction) => {
        const { id } = res.locals.JWTPayload
        const userRepository  = getRepository(Users)
        
        let user:Users;
        
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (error) {
            // console.log(1);
            return res.status(404).json({"messaje": "Not authorized!"})
        }
        
        // const {role} = user          ////////////////////////
        // console.log(user);
        
        // if(roles.includes(role)){
        //     next()
        // }else{
        //     // console.log(2);
        //     return res.status(404).json({"messaje": "Not authorized!"})
        // } /////////////////
        
        
    }
} 
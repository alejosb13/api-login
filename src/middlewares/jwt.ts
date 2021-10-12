import { Request, Response, NextFunction } from "express"
import * as Jwt  from "jsonwebtoken";
import config from "../config/config"


    export const checkJWT =  (req: Request,res: Response, next:NextFunction) => {
        const token = <string>req.headers["auth"]
        let JWTPayload:any;
        
        try {
            JWTPayload = Jwt.verify(token,config.JWTSecret)
            res.locals.JWTPayload = JWTPayload
        } catch (error) {
            return res.status(404).json({"messaje": "Not authorized!"})
        }

        const { userID, username, roles} = JWTPayload 
        const newToken = Jwt.sign({userID,username,roles},config.JWTSecret,{expiresIn:"1h"})
        res.setHeader("token",newToken)
        next()
    }


import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next) =>{

    //this is a midware
    //take access token from cookie
    const token = req.cookies.access_token;
    if(!token) return next(createError(401,"you are not authenticated"))
    
    jwt.verify(token,process.env.JWT,(err,userInfoJWT)=>{
        if(err) return next(createError(403,"token not valid"));
        req.user = userInfoJWT;
        next()
    })
}


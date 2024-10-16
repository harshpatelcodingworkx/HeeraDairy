import { NextFunction, Request, Response } from "express"
import { BackendError } from "./errorHandler";
import { verifyToken } from "../services/generateAndVerifyToken";
import { user } from "../models/user";

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const beareToken = req.headers['authorization'];
    
        const token = beareToken?.split(" ")[1];
    
        if (!token) {
            return next(new BackendError(500, "Token not provided"));
        }
    
        const { id } = verifyToken(token);
        const userById = await user.findById(id,"",{
            select:{
                otp:false,
                otpSentOn:false,
                __v:false,
            }
        });

        if(userById?.token !== token){
            return next(new BackendError(401, "Unauthorized"));
        }
        next();
    } catch (err : any) {
        return next(new BackendError(500, err.stack?.split('\n')[0].split(":")[1]));
    }

}
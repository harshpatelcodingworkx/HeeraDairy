import { NextFunction, Request, Response } from "express";
import { ConnectDB } from "../config/ormconfig";
import USERS from "../entities/user";
import { BackendError } from "../middlewares/errorHandling";
const userRepo = ConnectDB.getRepository(USERS);

const addUser = async (req: Request, res: Response, next :NextFunction) => {
    try {
        const { firstName, lastName, phoneNo, userType = 2 } = req.body;
        
        const existingPhoneNo = await userRepo.findOneBy({
            phoneNo:phoneNo
        })

        if(existingPhoneNo){
            return next(new BackendError(500,"Number already exist"));
        }
        
        const result = await userRepo.save({
            firstName,
            lastName,
            phoneNo,
            userType,
            createdAt : new Date(),
            updatedAt : new Date(),
        });
    
        if(!result ){
            return next(new BackendError(500, "Unable to add user"));
        }
    
        res.status(201).json({
            status:"Success",
            message:"Successfully added user",
            result:{},
        })
        
    } catch (err : any) {
        console.log("error", err);
    } 
}

export{
    addUser,
}
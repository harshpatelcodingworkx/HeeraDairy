import { NextFunction, Request, Response } from "express";
import { ConnectDB } from "../config/ormconfig";
import USERS from "../entities/user";
import { BackendError } from "../middlewares/errorHandling";
const userRepo = ConnectDB.getRepository(USERS);

const addUser = async (req: Request, res: Response, next :NextFunction) => {
    const { firstName, lastName, phoneNo, userType = 2 } = req.body;

    console.log(firstName);
    console.log(lastName);
    console.log(phoneNo);
    console.log(userType);

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
        result:result,
    })
}

export{
    addUser,
}
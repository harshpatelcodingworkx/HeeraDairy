import { NextFunction, Request, Response } from "express";
import { user } from "../models/user";
import { BackendError } from "../middlewares/errorHandler";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, phoneNo, userType = 2 } = req.body;

        const result = await user.create({
            firstName,
            lastName,
            phoneNo,
            userType,
        });

        if (!result) {
            return next(new BackendError(500, "Unable to add user"));
        }

        res.status(201).json({
            status: "Success",
            message: "Successfully added user",
            result: {},
        })

    } catch (err: any) {
        console.log("error", err);
    }
}


export {
    addUser,
}
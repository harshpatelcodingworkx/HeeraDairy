import { NextFunction, Response } from "express"
import Joi from 'joi';
import { BackendError } from "./errorHandler";
import { RequestType } from "../interfaces/appInterfaces";



const validate = (schema: Joi.Schema) => {
    return async (req: RequestType<unknown, unknown, unknown>, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();

        } catch (err: any) {
            // console.log("Err", err);
            return next(new BackendError(422, err.message));
        }
    }
}

export {
    validate,
}
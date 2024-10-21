import { NextFunction, Response } from "express"
import { BackendError } from "./errorHandler";
import { verifyToken } from "../services/generateAndVerifyToken";
import { user } from "../models/user";
import { RequestType } from "../interfaces/appInterfaces";




export const authUser = async (req: RequestType<unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    try {
        const AuthHeaderToken = req.headers['authorization'];

        const token = AuthHeaderToken?.split(" ")[1];

        if (!token) {
            return next(new BackendError(500, "Token not provided"));
        }

        const { id } = verifyToken(token);
        const userById = await user.findById(id, "", {
            select: {
                otp: false,
                otpSentOn: false,
                __v: false,
            }
        });

        if (userById?.token !== token) {
            return next(new BackendError(401, "Unauthorized"));
        }

        req.user = userById;
        next();
    } catch (err: any) {
        return next(new BackendError(500, err.stack?.split('\n')[0].split(":")[1]));
    }

}
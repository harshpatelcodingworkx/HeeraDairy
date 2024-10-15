import { NextFunction, Request, Response } from "express";
import USERS from "../entities/user";
import { ConnectDB } from "../config/ormconfig";
import { BackendError } from "../middlewares/errorHandling";
import { generateToken, verifyToken } from "../services/generateAndVerifyToken";
import sendSms from "../services/otpService";
const userRepo = ConnectDB.getRepository(USERS);




const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNo } = req.body;

    const otp = Math.floor(Math.random() * (10000 - 1000) + 1000);

    const user = await userRepo.findOneBy({
        phoneNo: phoneNo
    });


    if (!user) {
        return next(new BackendError(400, "User not found"));
    }

    const token = generateToken(user.id, "5minutes");
    sendSms(phoneNo, otp);

    await userRepo.update(user.id, {
        otp: otp.toString(),
        otpSentOn: new Date(),
    });



    user.token = token;
    res.status(200).json({
        status: "Success",
        message: "OTP sent successfully",
        result: token,
    });

}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const beareToken = req.headers['authorization']
    const token = beareToken?.split(" ")[1];
    const userOTP = req.body.otp;

    if (!token) {
        return next(new BackendError(500, "Token not provided"));
    }
    try {
        const { id } = verifyToken(token);

        const user = await userRepo.findOneBy({
            id: id
        });

        if (!user) {
            return next(new BackendError(500, "Unable to find user"));
        }

        const otpExpiry = (Date.now() - user.otpSentOn.getTime()) / 1000
        if (otpExpiry > 120) {
            return next(new BackendError(400, "OTP expired"));
        }
        else if (user.otp !== userOTP) {
            return next(new BackendError(400, "Wrong OTP"));
        }

        const userToken = generateToken(user.id, "30d");

        await userRepo.update(user.id, {
            token: userToken
        });

        user.token = userToken;
        res.status(200).json({
            status: "Success",
            message: "Logged in successfully",
            result: user
        });
    } catch (err: any) {
        // console.log(err);
        return next(new BackendError(400, err.stack?.split('\n')[0].split(":")[1]));
    }

}

export {
    login,
    sendOTP
}

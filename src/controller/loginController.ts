import { NextFunction, Request, Response } from "express";
import USERS from "../entities/user";
import { ConnectDB } from "../config/ormconfig";
import { BackendError } from "../middlewares/errorHandling";
import { generateToken, verifyToken } from "../services/generateAndVerifyToken";
import sendSms from "../services/otpService";
const userRepo = ConnectDB.getRepository(USERS);




const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNo } = req.body;
    // console.log(phoneNo);

    const otp = Math.floor(Math.random() * (10000 - 1000) + 1000);

    const user = await userRepo.findOneBy({
        phoneNo: phoneNo
    });


    if (!user) {
        return next(new BackendError(400, "User not found"));
    }

    const token = generateToken(user.id, "30minutes");
    sendSms(phoneNo, otp);

    await userRepo.update(user.id, {
        otp: otp.toString(),
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

    const { id } = verifyToken(token);

    const user = await userRepo.findOneBy({
        id: id
    });


    if (user?.otp !== userOTP) {
        return next(new BackendError(400, "Wrong Password"));
    }

    res.status(200).json({
        status: "Success",
        message: "Logged in successfully",
        result: user
    });
}

export {
    login,
    sendOTP
}

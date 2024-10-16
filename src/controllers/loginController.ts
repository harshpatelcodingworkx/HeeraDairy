import { NextFunction, Request, Response } from "express";
import { user } from "../models/user";
import { BackendError } from "../middlewares/errorHandler";
import { generateToken, verifyToken } from "../services/generateAndVerifyToken";
import sendSms from "../services/otpService";


const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNo } = req.body;

    const otp = Math.floor(Math.random() * (10000 - 1000) + 1000);

    const response = await user.findOne({
        phoneNo: phoneNo
    });

    if (!response) {
        return next(new BackendError(400, "User not found"));
    }

    const token = generateToken(response._id, "5minutes");
    // sendSms(phoneNo, otp);

    await user.findByIdAndUpdate(response._id, {
        otp: otp.toString(),
        otpSentOn: new Date()
    });

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

        const response = await user.findById(id,"", {
            select:{
                createdAt:false,
                updatedAt:false,
                __v:false,
            }
        },);

        if (!response) {
            return next(new BackendError(500, "Unable to find user"));
        }

        const otpExpiry = (Date.now() - response.otpSentOn.getTime()) / 1000
        
        if (otpExpiry > 120) {
            return next(new BackendError(400, "OTP expired"));
        }
        else if (response.otp !== userOTP) {
            return next(new BackendError(400, "Wrong OTP"));
        }

        const userToken = generateToken(response._id, "365d");

        await user.findByIdAndUpdate(response._id, {
            token: userToken
        });

        response.token = userToken;
        // delete response.otp;
        res.status(200).json({
            status: "Success",
            message: "Logged in successfully",
            result: response
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
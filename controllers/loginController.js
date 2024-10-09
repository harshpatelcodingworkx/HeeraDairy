const { AppError } = require("../middleware/handleError");
const users = require("../models/users");
const sendSmsOtp = require("../services/sentOTP");
const { generateToken, verifyToken } = require("../services/tokenAuth");


const verifyOTPAndlogin = async (req, res,next) => {
    const bearerToken = req.headers['authorization'];

    const token = bearerToken?.split(" ")[1];
    const { id } = verifyToken(token);

    if(id === "invalid token"){
        return next(new AppError(400, "Invalid token"));
    }
    
    const { otp: userOTP } = req.body;

    const userByPk = await users.findByPk(id, 
        { 
            attributes:{
                exclude:['createdAt','deletedAt','updatedAt']
            },
            raw: true 
        }
    );

    const OtpExpiryTime = (Date.now() - userByPk.otpSentOn.getTime()) / 1000;
    console.log(OtpExpiryTime);

    if (OtpExpiryTime > 120) {
        return next(new AppError(400, "OTP expired"));
    }


    if (userByPk.otp !== userOTP) {
        return next(new AppError(400, "Wrong OTP"));
    }

    const loginToken = generateToken(userByPk.id, "365d");
    await users.update(
        { token: loginToken },
        {
            where: {
                id: userByPk.id
            }
        }
    );

    userByPk.token = loginToken;

    delete userByPk.otp;
    delete userByPk.otpSentOn;

    return res.status(200).json({
        status: "Success",
        message: "Logged in successfully",
        result: userByPk,
    });
}


const sendOTP = async (req, res) => {
    const { phoneNo } = req.body;
    const result = await users.findOne({
        where: {
            phoneNo
        }
    });

    if (!result) {
        return res.status(404).json({
            status: "Success",
            message: "Mobile number not found",
        });
    }

    const OTP = Math.floor(Math.random() * (10000 - 1000) + 1000); // 4 digits OTP
    sendSmsOtp(OTP, phoneNo);

    // storing OTP in db
    result.update({
        otp: OTP
    });

    const token = generateToken(result.id, "5minutes");
    res.status(200).json({
        status: "Success",
        message: "OTP sent successfully to your number",
        result: { token: token }
    })
}

module.exports = {
    sendOTP,
    verifyOTPAndlogin
}
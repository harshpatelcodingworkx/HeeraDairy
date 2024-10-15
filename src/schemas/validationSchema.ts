import Joi from 'joi';
import { user } from '../interfaces/addUserInterface';

const addUserSchema = Joi.object<user>({
    firstName: Joi.string().pattern(new RegExp('[a-zA-z ]{2,}'))
    .required().messages({
        "string.pattern.base":"Text only",
    }),
    lastName: Joi.string().pattern(new RegExp('[a-zA-z ]{2,}'))
        .required().messages({
            "string.pattern.base":"Text only",
        }),
    phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
        "string.pattern.base":"Phone number should be of 10 digits noly",
        "string.empty":"Phone number cannot be empty",
        "any.required":"Phone number cannot be empty"
    }),
    userType: Joi.string().valid(...['0', '1', '2']).optional().messages({
        "any.only":"can have only 0,1,2"
    })
});

const sendOTPSchema = Joi.object({
    phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
        "string.pattern.base":"OTP should be of 10 digits",
        "string.empty":"Phone number cannot be empty",
        "any.required":"Phone number cannot be empty"
    }),

});


const verifyOTPSchema = Joi.object({
    otp: Joi.string().pattern(/^[0-9]{4}$/).required()
    .messages({
        "string.pattern.base":"should be of 4 digits",
        "string.empty":"OTP number cannot be empty",
        "any.required":"OTP number cannot be empty"
    }),

});
export {
    addUserSchema,
    sendOTPSchema,
    verifyOTPSchema
}
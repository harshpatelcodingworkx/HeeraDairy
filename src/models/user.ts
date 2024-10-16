import { Schema, model } from 'mongoose';


interface IUser {
    firstName: string,
    lastName: string,
    phoneNo: string,
    profilePicture: string,
    otp: string,
    otpSentOn: Date,
    token: string,
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        required: false,
    },
    otpSentOn: {
        type: Date,
        required: false,
    },
    token: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    });


export const user = model<IUser>('users', userSchema);
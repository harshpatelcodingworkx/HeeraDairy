import { Schema, model, set } from 'mongoose';


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
        unique:true,
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
    }
);

// function setTime(value : string) : string{
//     console.log("model",value);
//     if(value){
//         this.otpSentOn = new Date()
//         return value;
//     }

//     return "null";
// }
export const user = model<IUser>('users', userSchema);
import { Schema, model  } from 'mongoose';


interface IUser {
    firstName: string,
    lastName: string,
    phoneNo: string,
    profilePicture: string,
    otp: string,
    otpSentOn: Date,
    token: string,
    userType:string
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
    },
    userType:{
        type:String,
        enum:['0','1','2'], // 0->admin, 1-> manager, 2->user
        required:true,
    }
},
    {
        timestamps: true
    }
);

export const user = model<IUser>('users', userSchema);
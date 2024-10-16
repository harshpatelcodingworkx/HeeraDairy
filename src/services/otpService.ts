import { Twilio } from "twilio";

const sendSms = (myNumber : string, otp : number)=>{
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    
    const client = new Twilio(accountSid, authToken); 

    client.messages
    .create({
      from: twilioNumber,
      to: '+91'+ myNumber,
      body: `Your OTP is ${otp} from CodingWorkx`,
    })
    .then((message) => console.log(message.sid))
    .catch((err : Error)=>{
        console.log("Error from twilio ",err);
    })
}

export default sendSms;
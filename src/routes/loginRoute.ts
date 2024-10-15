import express from 'express';
import { login, sendOTP } from '../controller/loginController';
import { validate } from '../middlewares/validator';
import { sendOTPSchema, verifyOTPSchema } from '../schemas/validationSchema';



const router = express.Router();
router.post("/verifyotpandlogin",validate(verifyOTPSchema), login);
router.post("/sendotp",validate(sendOTPSchema), sendOTP);

export default router;
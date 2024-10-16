import express from 'express'
import { validate } from '../middlewares/validator';
import { sendOTPSchema, verifyOTPSchema } from '../schemas/validationSchema';
import { login, sendOTP } from '../controllers/loginController';
const router = express.Router();

router.post("/sendotp",validate(sendOTPSchema),sendOTP);
router.post("/login",validate(verifyOTPSchema),login);
export default router;
import express from 'express';
import { login, sendOTP } from '../controller/loginController';



const router = express.Router();
router.post("/verifyotpandlogin", login);
router.post("/sendotp", sendOTP);

export default router;
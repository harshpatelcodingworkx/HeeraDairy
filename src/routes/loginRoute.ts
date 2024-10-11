import express from 'express';
import { login } from '../controller/loginController';



const router = express.Router();
router.get("/login",login )

export default router;
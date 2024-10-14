import express from 'express';
import { addUser } from '../controller/adminController';




const router = express.Router();
router.post("/adduser", addUser);

export default router;
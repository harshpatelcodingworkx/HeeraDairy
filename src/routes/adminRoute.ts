import express from 'express'
import { addUser } from '../controllers/adminController';
import { validate } from '../middlewares/validator';
import { addUserSchema } from '../schemas/validationSchema';
import { authUser } from '../middlewares/auth';
const router = express.Router();

router.post("/adduser",validate(addUserSchema),addUser);
export default router;
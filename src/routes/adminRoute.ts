import express from 'express'
import { addUser, listUsers } from '../controllers/adminController';
import { validate } from '../middlewares/validator';
import { addUserSchema, querySchema } from '../schemas/validationSchema';
import { authUser } from '../middlewares/auth';
const router = express.Router();

router.use(authUser);
router.post("/adduser",validate(addUserSchema),addUser);
router.get("/listusers",listUsers);
export default router;
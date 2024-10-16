import express from 'express'
import { addProduct } from '../controllers/productController';
import { authUser } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { addProductSchema } from '../schemas/validationSchema';
const router = express.Router();

router.post("/addproduct",validate(addProductSchema),authUser,addProduct);
export default router;
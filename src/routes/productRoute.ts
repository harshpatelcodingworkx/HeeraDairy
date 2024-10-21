import express from 'express'
import { addProduct, deleteProduct, editProduct, productList } from '../controllers/productController';
import { authUser } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { addProductSchema, editProductSchema } from '../schemas/validationSchema';
const router = express.Router();

router.get("/productlist",productList);

router.use(authUser);
router.post("/addproduct",validate(addProductSchema),addProduct);
router.put("/editproduct/:id",validate(editProductSchema),editProduct);
router.delete("/deleteproduct/:id",deleteProduct);
export default router;
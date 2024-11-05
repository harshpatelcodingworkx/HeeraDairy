import express from "express"
import { addEntries, addUnits, addUser, listUsers } from "../controllers/adminController"
import { validate } from "../middlewares/validator"
import { addUserSchema, querySchema } from "../schemas/validationSchema"
import { authUser } from "../middlewares/auth"
const router = express.Router()

router.use(authUser)
router.post("/adduser", validate(addUserSchema), addUser)
router.get("/listusers", listUsers)
router.post("/addentries", addEntries);
router.post("/addunits",addUnits)
export default router

import express, { Application, Express } from "express"
import { getUserData } from "../controllers/userController"
import { authUser } from "../middlewares/auth"
import { myApplication } from "../interfaces/appInterfaces"

const router: myApplication<unknown, unknown> = express.Router()

router.use(authUser)
router.get("/getuser/:id?", getUserData)

export default router

import { Router } from "express" 
import AuthController  from "../controller/AuthController"
import { checkJWT } from "../middlewares/jwt"

const router = Router()

router.post("/login", AuthController.login)
router.post("/change-password", [checkJWT], AuthController.changePassword)

export default router;
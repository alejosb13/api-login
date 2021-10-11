import { Router } from "express" 
import UserController from "../controller/UserController";
import { checkJWT } from "../middlewares/jwt"
import { checkRole } from "../middlewares/role"

const router = Router()


router.get("/", UserController.getAll)  // regresa todos los usuarios 
router.get("/:id", UserController.getById)  // regresa la info de un usuario
router.post("/", UserController.newUSer)  // Crea un usuario
router.patch("/:id", UserController.editUser)  // Edita un usuario
router.delete("/:id", UserController.deleteUser)  // Elimina un usuario

// router.get("/",[checkJWT, checkRole(["admin"])], UserController.getAll)  // regresa todos los usuarios 
// router.get("/:id",[checkJWT, checkRole(["admin"])], UserController.getById)  // regresa la info de un usuario
// router.post("/",[checkJWT, checkRole(["admin"])], UserController.newUSer)  // Crea un usuario
// router.patch("/:id",[checkJWT, checkRole(["admin"])], UserController.editUser)  // Edita un usuario
// router.delete("/:id",[checkJWT, checkRole(["admin"])], UserController.deleteUser)  // Elimina un usuario

export default router;
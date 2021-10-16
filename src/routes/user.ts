import { Router } from "express" 
import UserController from "../controller/UserController";
import RoleController from "../controller/RoleController";
import { checkJWT } from "../middlewares/jwt"
import { checkRole } from "../middlewares/role"

const router = Router()

router.get("/",[checkJWT, checkRole(["Administrator","User"])], UserController.getAll)  // regresa todos los usuarios 
router.get("/:id",[checkJWT, checkRole(["Administrator","User"])], UserController.getById)  // regresa la info de un usuario
router.post("/",[checkJWT, checkRole(["Administrator","User"])], UserController.newUSer)  // Crea un usuario
router.patch("/:id",[checkJWT, checkRole(["Administrator"])], UserController.editUser)  // Edita un usuario
router.delete("/:id",[checkJWT, checkRole(["Administrator","User"])], UserController.deleteUser)  // Elimina un usuario

router.post("/roletouser/:idUser/:idRole", RoleController.setRoleToUser)  // crea relacion User a Role

export default router;
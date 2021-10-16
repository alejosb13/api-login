import { Router } from "express" 
import RoleController from "../controller/RoleController";
import { checkJWT } from "../middlewares/jwt"
import { checkRole } from "../middlewares/role"

const router = Router()

router.get("/", [checkJWT, checkRole(["Administrator"])] ,RoleController.getAll)  // regresa todos los roles 
router.post("/", [checkJWT, checkRole(["Administrator"])] ,RoleController.newRole)  // Crea un role
router.patch("/:id", [checkJWT, checkRole(["Administrator"])] ,RoleController.editRole)  // Edita un role
router.delete("/:id", [checkJWT, checkRole(["Administrator"])] ,RoleController.deleteRole)  // Elimina un role

router.post("/roletouser/:idRole/:idUser", RoleController.setRoleToUser)  // crea relacion Role a user

export default router;
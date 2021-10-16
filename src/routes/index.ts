import { Router } from "express"
import auth from "./auth"
import user from "./user"
import role from "./role"

const routes = Router()

routes.use("/auth", auth)
routes.use("/users", user)
routes.use("/roles", role)

routes.get('/', function(req, res) {
    res.send('Api');
});

export default routes

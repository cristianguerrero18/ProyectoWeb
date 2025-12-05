import { method as UsuariosControllers } from "../../controllers/Admin/users.controllers.js";
import Router from "express"
import { verificarToken } from "../../middlewares/auth.js";

const router =  Router();

router.post('/',UsuariosControllers.postUsuarios);
router.get('/',UsuariosControllers.getUsuarios);
router.put('/',UsuariosControllers.putUsuarios);
router.post("/login", UsuariosControllers.login);
router.post("/recuperar-clave", UsuariosControllers.recuperarClave);
router.delete('/:id', UsuariosControllers.deleteUser);
router.get('/:id', UsuariosControllers.obtenerporId);
export default router; 


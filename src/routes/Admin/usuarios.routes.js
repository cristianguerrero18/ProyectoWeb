import { method as UsuariosControllers } from "../../controllers/Admin/usuarios.controllers.js";
import Router from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();

router.post('/', UsuariosControllers.postUsuarios);
router.get('/', UsuariosControllers.getUsuarios);
router.put('/', UsuariosControllers.putUsuarios);

router.post('/login', UsuariosControllers.login);
router.post('/recuperar-clave', UsuariosControllers.recuperarClave);

router.get('/carrera/:id_carrera', UsuariosControllers.obtenerCarreraPorId);
router.get('/rol/:id_rol', UsuariosControllers.obtenerRolPorId);

router.delete('/:id', verificarToken, UsuariosControllers.deleteUser);
router.get('/:id', UsuariosControllers.obtenerporId);


//rutas de estd

export default router;

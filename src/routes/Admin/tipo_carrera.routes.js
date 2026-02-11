import { method as Tipo_carreraControllers } from "../../controllers/Admin/tipo_carrera.controllers.js";
import {Router} from "express"

const router = Router();


router.get('/', Tipo_carreraControllers.getTipo_carrera);
router.post('/',Tipo_carreraControllers.postTipo_carrera);
router.put('/',Tipo_carreraControllers.putTipo_carrera);
router.delete('/:id_tipo_carrera',Tipo_carreraControllers.deleteTipo_carreras);
export default router;

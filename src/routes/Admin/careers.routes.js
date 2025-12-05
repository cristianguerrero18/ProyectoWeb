import { method as CarreraController } from "../../controllers/Admin/careers.controllers.js";
import Router from "express"

const router  =  Router();

router.get('/', CarreraController.getCarrera);
router.post('/',CarreraController.postCarrera);
router.put('/',CarreraController.putCarrera);
router.delete('/:id_carrera',CarreraController.deleteCarrera);
router.get('/carrera_tipo/:id_tipo_carrera',CarreraController.getCarrerasPortipo);
export default router;

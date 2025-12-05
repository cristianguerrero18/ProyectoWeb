import { method  as RolesControllers} from "../../controllers/Admin/roles.controllers.js";
import Router from "express"

const router = Router();

router.get('/',RolesControllers.getRoles);
router.post('/',RolesControllers.postRoles);
router.put('/', RolesControllers.putRoles);
router.delete('/:id_rol', RolesControllers.deleteRoles);

export default router;

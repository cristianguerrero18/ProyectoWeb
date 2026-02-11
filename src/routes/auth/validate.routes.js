import {method as ValidarController} from "../../controllers/auth/validate.controllers.js";
import Router from "express"

const router =  Router();

router.post('/',ValidarController.validar);

export default router;
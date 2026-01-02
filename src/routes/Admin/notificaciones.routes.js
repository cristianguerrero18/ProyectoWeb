import { NotifyController } from "../../controllers/Admin/notificaciones.controllers.js";
import { Router } from "express";

const router = Router();



// Obtener todos las notificaciones
router.get("/", NotifyController.getNotificaciones);

// obtener notificaciones de administrador
router.get("/:id_usuario", NotifyController.getNotifyPorId);


router.put("/visto/:id_notificacion", NotifyController.updateEstadoVisto);


// Eliminar notificación
router.delete("/:id_notificacion", NotifyController.deleteNotify);


export default router;
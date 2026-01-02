import { AsignaturaController } from "../../controllers/Admin/asignaturas.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);
// Obtener todas las asignaturas
router.get("/", AsignaturaController.getAsignaturas);

// Obtener asignatura por ID
router.get("/:id", AsignaturaController.getAsignaturaPorId);

// Crear asignaturas (puede recibir un array de asignaturas)
router.post("/", AsignaturaController.postAsignaturas);

// Actualizar asignatura
router.put("/", AsignaturaController.putAsignatura);

// Eliminar asignatura
router.delete("/:id", AsignaturaController.deleteAsignatura);

export default router;

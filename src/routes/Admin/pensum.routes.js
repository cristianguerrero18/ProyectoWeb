import { PensumController } from "../../controllers/Admin/pensum.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();


// Obtener todos los registros del pensum
router.get("/", PensumController.getPensum);

// Obtener registro por ID
router.get("/:id", PensumController.getPensumPorId);

// Crear registros del pensum
router.post("/", PensumController.postPensum);

// Actualizar registro
router.put("/", PensumController.putPensum);

// Eliminar registro
router.delete("/:id", PensumController.deletePensum);

router.get(
  "/carrera/:id_carrera",
  PensumController.getAsignaturasPorCarrera
);

router.get("/carrera/:id_carrera/nombres", PensumController.getNombresAsignaturasPorCarrera);
export default router;

import { CarrerasController } from "../../controllers/Admin/carreras.controllers.js";
import { Router } from "express";

const router = Router();
// Obtener todas las carreras
router.get("/", CarrerasController.getCarreras);

// Obtener carrera por ID
router.get("/:id", CarrerasController.getCarreraPorId);

// Obtener carreras por tipo
router.get("/tipo/:id_tipo_carrera", CarrerasController.getCarrerasPorTipo);

// Crear carreras
router.post("/", CarrerasController.postCarreras);

// Actualizar carrera
router.put("/", CarrerasController.putCarrera);

// Eliminar carrera
router.delete("/:id", CarrerasController.deleteCarrera);

export default router;


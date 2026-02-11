import LogAccesoController from "../../controllers/Admin/log_acceso.controllers.js";
import { Router } from "express";

const router = Router();

// Obtener todos los logs
router.get("/", LogAccesoController.getTodos);

// Obtener logs detallados
router.get("/detallados", LogAccesoController.getDetallados);

// Obtener logs por usuario
router.get("/usuario/:id_usuario", LogAccesoController.getLogsPorUsuario);

// Registrar log simple
router.post("/", LogAccesoController.registrarLog);

// Registrar log completo
router.post("/completo", LogAccesoController.registrarLogCompleto);

export default router;

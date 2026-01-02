import { ReporteController } from "../../controllers/Admin/reportes.controllers.js";
import { Router } from "express";

const router = Router();

// Obtener todos los roles
router.get("/", ReporteController.getReportes);

// Obtener rol por ID
router.get("/:id_reporte", ReporteController.getReportePorId);
router.get("/recurso/:id_recurso", ReporteController.getReportePorRecurso);
router.get("/completo/:id_reporte", ReporteController.getReporteCompleto);


// Crear rol
router.post("/", ReporteController.postReporte);

// Eliminar rol
router.delete("/:id_reporte", ReporteController.deleteReporte);

export default router;

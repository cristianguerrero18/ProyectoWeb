import DashboardController from "../../controllers/Admin/dashboard.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints para la consulta de indicadores generales del sistema
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Obtener indicadores generales del dashboard
 *     description: Retorna los totales generales del sistema, como usuarios, recursos, asignaturas u otros indicadores definidos para el panel administrativo.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Indicadores obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", DashboardController.getTotales);

export default router;

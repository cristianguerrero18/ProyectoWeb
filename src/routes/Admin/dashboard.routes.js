import DashboardController from "../../controllers/Admin/dashboard.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Estadísticas y métricas del sistema
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Obtener totales del dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Totales obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsuarios:
 *                   type: integer
 *                 totalRecursos:
 *                   type: integer
 *                 totalCarreras:
 *                   type: integer
 */
router.get("/", DashboardController.getTotales);

export default router;
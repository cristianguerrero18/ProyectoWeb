import { ReporteController } from "../../controllers/Admin/reportes.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Endpoints para la gestión de reportes de recursos del sistema
 */

/**
 * @swagger
 * /api/reportes:
 *   get:
 *     summary: Obtener todos los reportes
 *     description: Retorna la lista completa de reportes registrados sobre recursos del sistema.
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Reportes obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", ReporteController.getReportes);

/**
 * @swagger
 * /api/reportes/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener reportes por recurso
 *     description: Retorna los reportes asociados a un recurso específico.
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: Identificador del recurso
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Reportes obtenidos correctamente
 *       404:
 *         description: No se encontraron reportes para el recurso
 *       500:
 *         description: Error interno del servidor
 */
router.get("/recurso/:id_recurso", ReporteController.getReportePorRecurso);

/**
 * @swagger
 * /api/reportes/completo/{id_reporte}:
 *   get:
 *     summary: Obtener detalle completo de un reporte
 *     description: Retorna la información ampliada de un reporte específico.
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         description: Identificador del reporte
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Reporte completo obtenido correctamente
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/completo/:id_reporte", ReporteController.getReporteCompleto);

/**
 * @swagger
 * /api/reportes/{id_reporte}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     description: Retorna la información de un reporte específico según su identificador.
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         description: Identificador único del reporte
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Reporte encontrado correctamente
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id_reporte", ReporteController.getReportePorId);

/**
 * @swagger
 * /api/reportes:
 *   post:
 *     summary: Crear un nuevo reporte
 *     description: Permite registrar un nuevo reporte sobre un recurso del sistema.
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_recurso:
 *                 type: integer
 *                 example: 8
 *               motivo:
 *                 type: string
 *                 example: El recurso contiene información incorrecta
 *     responses:
 *       201:
 *         description: Reporte registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", ReporteController.postReporte);

/**
 * @swagger
 * /api/reportes/{id_reporte}:
 *   delete:
 *     summary: Eliminar un reporte
 *     description: Elimina un reporte del sistema según su identificador.
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         description: Identificador del reporte
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Reporte eliminado correctamente
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id_reporte", ReporteController.deleteReporte);

export default router;
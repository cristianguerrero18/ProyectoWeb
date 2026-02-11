import { ReporteController } from "../../controllers/Admin/reportes.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Gestión de reportes de contenido inapropiado
 */

/**
 * @swagger
 * /reportes:
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [Reportes]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, revisado, resuelto]
 *         description: Filtrar por estado del reporte
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [contenido_inapropiado, spam, derechos_autor, otro]
 *         description: Filtrar por tipo de reporte
 *     responses:
 *       200:
 *         description: Lista de reportes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reporte'
 */
router.get("/", ReporteController.getReportes);

/**
 * @swagger
 * /reportes/{id_reporte}:
 *   get:
 *     summary: Obtener reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: Reporte no encontrado
 */
router.get("/:id_reporte", ReporteController.getReportePorId);

/**
 * @swagger
 * /reportes/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener reportes por recurso
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso reportado
 *     responses:
 *       200:
 *         description: Reportes del recurso obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reporte'
 */
router.get("/recurso/:id_recurso", ReporteController.getReportePorRecurso);

/**
 * @swagger
 * /reportes/completo/{id_reporte}:
 *   get:
 *     summary: Obtener reporte completo con información relacionada
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte completo obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReporteCompleto'
 *       404:
 *         description: Reporte no encontrado
 */
router.get("/completo/:id_reporte", ReporteController.getReporteCompleto);

/**
 * @swagger
 * /reportes:
 *   post:
 *     summary: Crear nuevo reporte
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario_reporta
 *               - id_recurso
 *               - tipo_reporte
 *               - descripcion
 *             properties:
 *               id_usuario_reporta:
 *                 type: integer
 *                 example: 1
 *                 description: ID del usuario que realiza el reporte
 *               id_recurso:
 *                 type: integer
 *                 example: 1
 *                 description: ID del recurso reportado
 *               tipo_reporte:
 *                 type: string
 *                 enum: [contenido_inapropiado, spam, derechos_autor, otro]
 *                 example: "contenido_inapropiado"
 *               descripcion:
 *                 type: string
 *                 example: "Este contenido tiene imágenes ofensivas"
 *               evidencia_url:
 *                 type: string
 *                 example: "https://ejemplo.com/evidencia.jpg"
 *                 description: URL de evidencia opcional
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *       400:
 *         description: Datos inválidos o recurso no encontrado
 */
router.post("/", ReporteController.postReporte);

/**
 * @swagger
 * /reportes/{id_reporte}:
 *   delete:
 *     summary: Eliminar reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_reporte
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reporte a eliminar
 *     responses:
 *       200:
 *         description: Reporte eliminado exitosamente
 *       404:
 *         description: Reporte no encontrado
 */
router.delete("/:id_reporte", ReporteController.deleteReporte);

export default router;
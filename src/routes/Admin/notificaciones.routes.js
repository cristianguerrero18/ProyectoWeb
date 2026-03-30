import { Router } from "express";
import { NotifyController } from "../../controllers/Admin/notificaciones.controllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: Endpoints para la gestión de notificaciones del sistema
 */

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Notificaciones obtenidas correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", NotifyController.getNotificaciones);

/**
 * @swagger
 * /api/notificaciones:
 *   post:
 *     summary: Crear una notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               titulo:
 *                 type: string
 *                 example: Nuevo recurso publicado
 *               mensaje:
 *                 type: string
 *                 example: Se ha publicado un nuevo recurso en tu asignatura
 *               tipo:
 *                 type: string
 *                 example: recurso
 *               estado:
 *                 type: string
 *                 example: no_visto
 *     responses:
 *       201:
 *         description: Notificación creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", NotifyController.createNotificacion);

/**
 * @swagger
 * /api/notificaciones/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener notificaciones por usuario
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Notificaciones del usuario obtenidas correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuario/:id_usuario", NotifyController.getNotificacionesPorUsuario);

/**
 * @swagger
 * /api/notificaciones/usuario/{id_usuario}/no-leidas:
 *   get:
 *     summary: Obtener cantidad de notificaciones no leídas
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Cantidad obtenida correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuario/:id_usuario/no-leidas", NotifyController.getCantidadNoLeidas);

/**
 * @swagger
 * /api/notificaciones/{id_notificacion}/visto:
 *   put:
 *     summary: Marcar una notificación como vista
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id_notificacion/visto", NotifyController.updateEstadoVisto);

/**
 * @swagger
 * /api/notificaciones/usuario/{id_usuario}/vistas:
 *   put:
 *     summary: Marcar todas las notificaciones del usuario como vistas
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Notificaciones actualizadas correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.put("/usuario/:id_usuario/vistas", NotifyController.updateTodasVistas);

/**
 * @swagger
 * /api/notificaciones/{id_notificacion}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Notificación eliminada correctamente
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id_notificacion", NotifyController.deleteNotify);

export default router;
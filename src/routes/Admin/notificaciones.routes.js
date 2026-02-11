import { NotifyController } from "../../controllers/Admin/notificaciones.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: Gestión de notificaciones del sistema
 */

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     summary: Obtener todas las notificaciones (Admin)
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacion'
 */
router.get("/", NotifyController.getNotificaciones);

/**
 * @swagger
 * /notificaciones/{id_usuario}:
 *   get:
 *     summary: Obtener notificaciones por usuario
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Notificaciones del usuario obtenidas correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id_usuario", NotifyController.getNotifyPorId);

/**
 * @swagger
 * /notificaciones/visto/{id_notificacion}:
 *   put:
 *     summary: Marcar notificación como vista
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación marcada como vista
 *       404:
 *         description: Notificación no encontrada
 */
router.put("/visto/:id_notificacion", NotifyController.updateEstadoVisto);

/**
 * @swagger
 * /notificaciones/{id_notificacion}:
 *   delete:
 *     summary: Eliminar notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada exitosamente
 *       404:
 *         description: Notificación no encontrada
 */
router.delete("/:id_notificacion", NotifyController.deleteNotify);

export default router;
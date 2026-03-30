import LogAccesoController from "../../controllers/Admin/log_acceso.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: LogsAcceso
 *   description: Endpoints para la gestión y trazabilidad de registros de acceso del sistema
 */

/**
 * @swagger
 * /api/logs-acceso:
 *   get:
 *     summary: Obtener todos los logs de acceso
 *     description: Retorna la lista general de registros de acceso almacenados en el sistema.
 *     tags: [LogsAcceso]
 *     responses:
 *       200:
 *         description: Logs obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", LogAccesoController.getTodos);

/**
 * @swagger
 * /api/logs-acceso/detallados:
 *   get:
 *     summary: Obtener logs detallados
 *     description: Retorna los registros de acceso con información ampliada para auditoría y trazabilidad.
 *     tags: [LogsAcceso]
 *     responses:
 *       200:
 *         description: Logs detallados obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/detallados", LogAccesoController.getDetallados);

/**
 * @swagger
 * /api/logs-acceso/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener logs de acceso por usuario
 *     description: Retorna los registros de acceso asociados a un usuario específico.
 *     tags: [LogsAcceso]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: Identificador del usuario
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Logs del usuario obtenidos correctamente
 *       404:
 *         description: No se encontraron logs para el usuario indicado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuario/:id_usuario", LogAccesoController.getLogsPorUsuario);

/**
 * @swagger
 * /api/logs-acceso:
 *   post:
 *     summary: Registrar un log de acceso simple
 *     description: Registra un evento básico de acceso en el sistema.
 *     tags: [LogsAcceso]
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
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-03-19T14:30:00
 *               ip:
 *                 type: string
 *                 example: 192.168.1.10
 *     responses:
 *       201:
 *         description: Log registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", LogAccesoController.registrarLog);

/**
 * @swagger
 * /api/logs-acceso/completo:
 *   post:
 *     summary: Registrar un log de acceso completo
 *     description: Registra un evento detallado de acceso con información ampliada del usuario y del entorno de conexión.
 *     tags: [LogsAcceso]
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
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-03-19T14:30:00
 *               ip:
 *                 type: string
 *                 example: 192.168.1.10
 *               user_agent:
 *                 type: string
 *                 example: Mozilla/5.0
 *               correo:
 *                 type: string
 *                 example: usuario@uts.edu.co
 *     responses:
 *       201:
 *         description: Log completo registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/completo", LogAccesoController.registrarLogCompleto);

/**
 * @swagger
 * /api/logs-acceso/eliminar-todos:
 *   delete:
 *     summary: Eliminar todos los logs
 *     description: Elimina todos los registros de acceso almacenados en el sistema.
 *     tags: [LogsAcceso]
 *     responses:
 *       200:
 *         description: Logs eliminados correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/eliminar-todos", LogAccesoController.eliminarTodosLosLogs);

/**
 * @swagger
 * /api/logs-acceso/truncar:
 *   post:
 *     summary: Truncar la tabla de logs
 *     description: Elimina todos los registros de acceso y reinicia el valor autoincremental de la tabla.
 *     tags: [LogsAcceso]
 *     responses:
 *       200:
 *         description: Tabla truncada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/truncar", LogAccesoController.truncarLogs);

/**
 * @swagger
 * /api/logs-acceso/eliminar-por-fecha:
 *   post:
 *     summary: Eliminar logs por rango de fechas
 *     description: Elimina registros de acceso dentro de un rango de fechas definido.
 *     tags: [LogsAcceso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-01
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-31
 *     responses:
 *       200:
 *         description: Logs eliminados correctamente según el rango de fechas
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/eliminar-por-fecha", LogAccesoController.eliminarLogsPorFecha);

export default router;